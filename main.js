// グローバル変数の定義
let methods = {};
let sealingMaterials = {};

// JSON データを取得して初期化
Promise.all([
    fetch('methods.json').then(response => response.json()),
    fetch('sealing_materials.json').then(response => response.json())
])
.then(([methodsData, sealingData]) => {
    methods = methodsData;
    sealingMaterials = sealingData;
    initAllCalculations();
})
.catch(error => console.error('データの読み込みに失敗:', error));

// すべての初期化を行う関数
function initAllCalculations() {
    initManufacturers(); // 通常工法の初期化
    initSealingManufacturers(); // シーリング工法の初期化
    initCalculationBox(1); // 計算ボックス1の初期化
    initCalculationBox(2); // 計算ボックス2の初期化
    setupInitialAreaTotals(); // 面積合計の初期表示
    setupExcelExport(); // Excelエクスポートの設定
}

// 通常工法の初期化
const initManufacturers = () => {
    [1, 2].forEach(num => {
        const manufacturerSelect = document.getElementById(`manufacturer${num}`);
        const manufacturers = [...new Set(Object.values(methods).map(method => method.manufacturer))];
        manufacturers.forEach(manufacturer => {
            const option = document.createElement('option');
            option.value = manufacturer;
            option.textContent = manufacturer;
            manufacturerSelect.appendChild(option);
        });

        manufacturerSelect.addEventListener('change', () => {
            const methodSelect = document.getElementById(`method${num}`);
            methodSelect.innerHTML = '<option value="">選択してください</option>';
            const selectedManufacturer = manufacturerSelect.value;

            Object.entries(methods).forEach(([key, method]) => {
                if (method.manufacturer === selectedManufacturer) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = method.name;
                    methodSelect.appendChild(option);
                }
            });
        });
    });
};

// シーリング工法の初期化
const initSealingManufacturers = () => {
    ['1', '2'].forEach(num => {
        const manufacturerSelect = document.querySelector(`#sealing-box-template-${num} .manufacturer-select`);
        const materialSelect = document.querySelector(`#sealing-box-template-${num} .material-select`);
        
        const manufacturers = [...new Set(Object.values(sealingMaterials)
            .map(material => material.manufacturer))];

        manufacturers.forEach(manufacturer => {
            const option = document.createElement('option');
            option.value = manufacturer;
            option.textContent = manufacturer;
            manufacturerSelect.appendChild(option);
        });

        manufacturerSelect.addEventListener('change', () => {
            materialSelect.innerHTML = '<option value="">選択してください</option>';
            const selectedManufacturer = manufacturerSelect.value;

            Object.entries(sealingMaterials).forEach(([key, material]) => {
                if (material.manufacturer === selectedManufacturer) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = material.name;
                    materialSelect.appendChild(option);
                }
            });
        });

        // シーリング計算ボタンのイベントリスナー
        const calculateBtn = document.querySelector(`#sealing-box-template-${num} .calculate-btn`);
        calculateBtn.addEventListener('click', () => calculateSealing(num));
    });
};

// 面積合計を更新する関数
function updateAreaTotal(num) {
    const areasContainer = document.getElementById(`areas${num}`);
    const areaInputs = areasContainer.querySelectorAll('.area-input');
    const totalArea = Array.from(areaInputs)
        .map(input => parseFloat(input.value) || 0)
        .reduce((sum, area) => sum + area, 0);
    
    document.getElementById(`totalArea${num}`).textContent = totalArea.toFixed(2);
}

// 面積入力欄を追加する関数
function addAreaInput(num) {
    const areasContainer = document.getElementById(`areas${num}`);
    const newGroup = document.createElement('div');
    newGroup.className = 'area-input-group';
    newGroup.innerHTML = `
        <input type="number" class="area-input" placeholder="面積を入力" oninput="updateAreaTotal(${num})">
        <button class="remove-area-btn">削除</button>
    `;
    
    const totalDisplay = areasContainer.querySelector('.area-total');
    areasContainer.insertBefore(newGroup, totalDisplay);

    newGroup.querySelector('.remove-area-btn').addEventListener('click', () => {
        areasContainer.removeChild(newGroup);
        updateAreaTotal(num);
    });
}

// 初期の面積合計表示の設定
function setupInitialAreaTotals() {
    // 既存の削除ボタンにイベントリスナーを追加
    document.querySelectorAll('.remove-area-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const group = e.target.parentElement;
            const areasContainer = group.parentElement;
            const num = areasContainer.id.slice(-1);
            
            if (areasContainer.querySelectorAll('.area-input-group').length > 1) {
                group.parentElement.removeChild(group);
                updateAreaTotal(num);
            }
        });
    });

    // 既存の入力フィールドにイベントリスナーを追加
    document.querySelectorAll('.area-input').forEach(input => {
        const num = input.closest('.areas-container').id.slice(-1);
        input.addEventListener('input', () => updateAreaTotal(num));
    });

    // 初期表示
    updateAreaTotal(1);
    updateAreaTotal(2);
}

// 計算ボックスの初期化
function initCalculationBox(num) {
    const calculateBtn = document.getElementById(`calculateBtn${num}`);
    const resultDiv = document.getElementById(`result${num}`);

    calculateBtn.addEventListener('click', () => {
        const totalArea = parseFloat(document.getElementById(`totalArea${num}`).textContent);
        const selectedMethodKey = document.getElementById(`method${num}`).value;
        const methodData = methods[selectedMethodKey];

        if (totalArea <= 0 || !methodData) {
            resultDiv.textContent = '正しい入力値を選択してください。';
            return;
        }

        displayMethodResult(resultDiv, methodData, totalArea);
    });
}

// シーリング工法の計算
function calculateSealing(num) {
    const box = document.querySelector(`#sealing-box-template-${num}`);
    const materialKey = box.querySelector('.material-select').value;
    const materialData = sealingMaterials[materialKey];
    const useHalf = box.querySelector('.half-calc').checked;
    
    if (!materialKey || !materialData) {
        alert('材料を選択してください');
        return;
    }
    
    let volume;
    if (num === '1') {
        const width = parseFloat(box.querySelector('.width-input').value) || 0;
        const depth = parseFloat(box.querySelector('.depth-input').value) || 0;
        const length = parseFloat(box.querySelector('.length-input').value) || 0;
        volume = (width * depth * length) / 1000;
    } else {
        const width = parseFloat(box.querySelector('.width-input').value) || 0;
        const depth = parseFloat(box.querySelector('.depth-input').value) || 0;
        const diameter = parseFloat(box.querySelector('.diameter-input').value) || 0;
        const count = parseFloat(box.querySelector('.count-input').value) || 0;
        volume = (width * depth * diameter * count) / 1000;
    }

    if (useHalf) {
        volume /= 2;
    }

    const requiredAmount = volume / materialData.capacity;
    const requiredCans = Math.ceil(requiredAmount);

    displaySealingResult(box, {
        volume,
        requiredAmount,
        requiredCans,
        materialData
    });
}

// 通常工法の結果表示
function displayMethodResult(resultDiv, methodData, totalArea) {
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    const table = createMethodResultTable(methodData, totalArea);
    tableContainer.appendChild(table);
    resultDiv.innerHTML = '';
    resultDiv.appendChild(tableContainer);
}

// シーリング工法の結果表示
function displaySealingResult(box, results) {
    const resultDiv = box.querySelector('.result');
    const table = document.createElement('table');
    
    table.innerHTML = `
        <tr>
            <th>材料名</th>
            <th>必要容量 (ml)</th>
            <th>必要本数（実数）</th>
            <th>必要本数（整数）</th>
            <th>単価</th>
            <th>金額</th>
        </tr>
        <tr>
            <td>${results.materialData.name}</td>
            <td>${results.volume.toFixed(2)}</td>
            <td>${results.requiredAmount.toFixed(2)}</td>
            <td>${results.requiredCans}</td>
            <td><input type="number" class="price-input" placeholder="単価"></td>
            <td class="total-price">0</td>
        </tr>
    `;

    setupPriceInput(table);
    resultDiv.innerHTML = '';
    resultDiv.appendChild(table);
}

// 結果テーブルの作成（通常工法用）
function createMethodResultTable(methodData, totalArea) {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>材料名</th>
            <th>必要使用量</th>
            <th>積算面積</th>
            <th>必要量</th>
            <th>実数</th>
            <th>整数</th>
            <th>単価</th>
            <th>金額</th>
        </tr>
    `;

    Object.entries(methodData.materials).forEach(([materialName, materialData]) => {
        const usage = calculateMaterialUsage(materialData, totalArea);
        const row = createMaterialRow(materialName, usage);
        table.appendChild(row);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="7" style="text-align: right; font-weight: bold;">合計:</td>
        <td class="total">0</td>
    `;
    table.appendChild(totalRow);

    return table;
}

// 材料使用量の計算
function calculateMaterialUsage(materialData, totalArea) {
    let calculatedArea = totalArea;
    let usagePerUnit = materialData.usagePerSqM || 1;
    let requiredAmount;

    if (materialData.type === 'tape1') {
        calculatedArea = Math.sqrt(totalArea) * 4;
        requiredAmount = calculatedArea;
    } else if (materialData.type === 'tape2') {
        calculatedArea = (totalArea / 10) * 9;
        requiredAmount = calculatedArea;
    } else {
        requiredAmount = calculatedArea * usagePerUnit * (materialData.usageFactor || 1);
    }

    const capacity = materialData.capacity || materialData.capacitySqM;
    return {
        calculatedArea,
        usagePerUnit,
        requiredAmount,
        requiredCans: Math.ceil(requiredAmount / capacity),
        requiredCansDecimal: (requiredAmount / capacity).toFixed(2)
    };
}

// 材料行の作成
function createMaterialRow(materialName, usage) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${materialName}</td>
        <td>${usage.usagePerUnit}</td>
        <td>${usage.calculatedArea.toFixed(2)}</td>
        <td>${Math.floor(usage.requiredAmount)}</td>
        <td>${usage.requiredCansDecimal}</td>
        <td>${usage.requiredCans}</td>
        <td><input type="number" class="price-input" placeholder="単価"></td>
        <td class="cost">0</td>
    `;

    setupPriceInput(row.closest('table'));
    return row;
}

// 価格入力の設定
function setupPriceInput(table) {
    table.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', () => updateTotalCost(table));
    });
}

// 合計金額の更新
function updateTotalCost(table) {
    const costs = Array.from(table.querySelectorAll('.cost'))
        .map(cell => parseInt(cell.textContent.replace(/,/g, '')) || 0);
    const total = costs.reduce((sum, cost) => sum + cost, 0);
    const totalCell = table.querySelector('.total') || table.querySelector('.total-price');
    totalCell.textContent = total.toLocaleString() + ' 円';
}

// Excelエクスポートの設定
function setupExcelExport() {
    document.getElementById('exportExcelBtn').addEventListener('click', () => {
        const workbook = XLSX.utils.book_new();
        
        // 通常工法の結果を追加
        [1, 2].forEach(num => {
            const resultDiv = document.getElementById(`result${num}`);
            const table = resultDiv.querySelector('table');
            if (table) {
                const ws = XLSX.utils.table_to_sheet(table);
                XLSX.utils.book_append_sheet(workbook, ws, `工法${num}`);
            }
        });

        // シーリング工法の結果を追加
        ['1', '2'].forEach(num => {
            const box = document.querySelector(`#sealing-box-template-${num}`);
            const table = box.querySelector('table');
            if (table) {
                const ws = XLSX.utils.table_to_sheet(table);
                XLSX.utils.book_append_sheet(workbook, ws, `シーリング工法${num}`);
            }
        });

        XLSX.writeFile(workbook, '見積もり.xlsx');
    });
}
