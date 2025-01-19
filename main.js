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
    initManufacturers();
    initSealingManufacturers();
})
.catch(error => console.error('データの読み込みに失敗:', error));

// 既存の工法の初期化
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

// シーリング工法の計算関数
function calculateSealing(num) {
    const box = document.querySelector(`#sealing-box-template-${num}`);
    const materialKey = box.querySelector('.material-select').value;
    const materialData = sealingMaterials[materialKey];
    const useHalf = box.querySelector('.half-calc').checked;
    
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

// シーリング計算結果の表示
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

    const priceInput = table.querySelector('.price-input');
    const totalCell = table.querySelector('.total-price');
    
    priceInput.addEventListener('input', (e) => {
        const price = parseFloat(e.target.value) || 0;
        totalCell.textContent = (price * results.requiredCans).toLocaleString() + ' 円';
    });

    resultDiv.innerHTML = '';
    resultDiv.appendChild(table);
}

//既存のコード
 let methods = {};

    // JSON データを取得して初期化
    fetch('methods.json')
        .then(response => response.json())
        .then(data => {
            methods = data;
            initManufacturers();
        });

    // メーカーと工法の初期化
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

   // 面積合計を更新する関数
    function updateAreaTotal(num) {
        const areasContainer = document.getElementById(`areas${num}`);
        const areaInputs = areasContainer.querySelectorAll('.area-input');
        const totalArea = Array.from(areaInputs)
            .map(input => parseFloat(input.value) || 0)
            .reduce((sum, area) => sum + area, 0);
        
        document.getElementById(`totalArea${num}`).textContent = totalArea.toFixed(2);
    }

    // 面積入力欄を追加する関数（更新）
    function addAreaInput(num) {
        const areasContainer = document.getElementById(`areas${num}`);
        const newGroup = document.createElement('div');
        newGroup.className = 'area-input-group';
        newGroup.innerHTML = `
            <input type="number" class="area-input" placeholder="面積を入力" oninput="updateAreaTotal(${num})">
            <button class="remove-area-btn">削除</button>
        `;
        
        // 合計表示の前に新しい入力グループを挿入
        const totalDisplay = areasContainer.querySelector('.area-total');
        areasContainer.insertBefore(newGroup, totalDisplay);

        // 削除ボタンのイベントリスナーを追加
        newGroup.querySelector('.remove-area-btn').addEventListener('click', () => {
            areasContainer.removeChild(newGroup);
            updateAreaTotal(num); // 削除後に合計を更新
        });
    }

    // 既存の削除ボタンにイベントリスナーを追加（更新）
    document.querySelectorAll('.remove-area-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const group = e.target.parentElement;
            const areasContainer = group.parentElement;
            const num = areasContainer.id.slice(-1); // areas1 or areas2 から数字を取得
            
            if (areasContainer.querySelectorAll('.area-input-group').length > 1) {
                group.parentElement.removeChild(group);
                updateAreaTotal(num); // 削除後に合計を更新
            }
        });
    });

    // 既存の入力フィールドにもイベントリスナーを追加
    document.querySelectorAll('.area-input').forEach(input => {
        const num = input.closest('.areas-container').id.slice(-1);
        input.addEventListener('input', () => updateAreaTotal(num));
    });

    // 初期化時に合計を表示
    updateAreaTotal(1);
    updateAreaTotal(2);

    const initCalculationBox = (num) => {
        const calculateBtn = document.getElementById(`calculateBtn${num}`);
const resultDiv = document.getElementById(`result${num}`);

calculateBtn.addEventListener('click', () => {
    const areasContainer = document.getElementById(`areas${num}`);
    const areaInputs = areasContainer.querySelectorAll('.area-input');
    const totalArea = Array.from(areaInputs)
        .map(input => parseFloat(input.value) || 0)
        .reduce((sum, area) => sum + area, 0);

    const selectedMethodKey = document.getElementById(`method${num}`).value;
    const methodData = methods[selectedMethodKey];

    if (totalArea <= 0 || !methodData) {
        resultDiv.textContent = '正しい入力値を選択してください。';
        return;
    }

    resultDiv.innerHTML = '<div class="table-container"></div>';
    const tableContainer = resultDiv.querySelector('.table-container');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>材料名</th>
        <th>必要使用量</th>
        <th>積算面積</th>
        <th>必要量</th>
        <th>実数</th>
        <th>整数</th>
        <th>単価</th>
        <th>金額</th>
    `;
    table.appendChild(headerRow);

    let totalCost = 0;
    Object.entries(methodData.materials).forEach(([materialName, materialData]) => {
        let requiredAmount = 0;
        let requiredCans = 0;
        let requiredCansDecimal = 0;
        let usagePerUnit = 0;
        let calculatedArea = totalArea;

        // 必要使用量の計算
        if (materialData.isAreaBased) {
            usagePerUnit = 1;
            requiredAmount = totalArea * (materialData.usageFactor || 1);
            requiredCans = Math.ceil(requiredAmount / materialData.capacitySqM);
            requiredCansDecimal = (requiredAmount / materialData.capacitySqM).toFixed(2);
        } else if (materialData.type === 'tape1') {
            usagePerUnit = materialData.usagePerSqM;
            calculatedArea = Math.sqrt(totalArea) * 4;
            requiredAmount = calculatedArea;
            requiredCans = Math.ceil(requiredAmount / materialData.capacity);
            requiredCansDecimal = (requiredAmount / materialData.capacity).toFixed(2);
        } else if (materialData.type === 'tape2') {
            usagePerUnit = materialData.usagePerSqM;
            calculatedArea = (totalArea / 10) * 9;
            requiredAmount = calculatedArea;
            requiredCans = Math.ceil(requiredAmount / materialData.capacity);
            requiredCansDecimal = (requiredAmount / materialData.capacity).toFixed(2);
        } else {
            usagePerUnit = materialData.usagePerSqM;
            requiredAmount = totalArea * materialData.usagePerSqM * (materialData.usageFactor || 1);
            requiredCans = Math.ceil(requiredAmount / materialData.capacity);
            requiredCansDecimal = (requiredAmount / materialData.capacity).toFixed(2);
        }

        const row = document.createElement('tr');
        const unitPriceInput = document.createElement('input');
        unitPriceInput.type = 'number';
        unitPriceInput.placeholder = '単価を入力';
        const costCell = document.createElement('td');

        unitPriceInput.addEventListener('input', () => {
            const unitPrice = parseFloat(unitPriceInput.value) || 0;
            const materialCost = requiredCans * unitPrice;
            costCell.textContent = materialCost.toLocaleString();
            updateTotalCost(table);
        });

        row.innerHTML = `
            <td>${materialName}</td>
            <td>${usagePerUnit}</td>
            <td>${calculatedArea.toFixed(2)}</td>
            <td>${Math.floor(requiredAmount)}</td>
            <td>${requiredCansDecimal}</td>
            <td>${requiredCans}</td>
        `;
        const priceCell = document.createElement('td');
        priceCell.appendChild(unitPriceInput);
        row.appendChild(priceCell);
        row.appendChild(costCell);
        table.appendChild(row);
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="7" style="text-align: right; font-weight: bold;">合計:</td>
        <td id="totalCost${num}">0</td>
    `;
    table.appendChild(totalRow);
    tableContainer.appendChild(table);
});
    };

    // 合計金額を更新する関数
    function updateTotalCost(table) {
        const rows = table.querySelectorAll('tr:not(:last-child)');
        let total = 0;
        rows.forEach(row => {
            const costCell = row.lastElementChild;
            if (costCell.textContent) {
                total += parseInt(costCell.textContent.replace(/,/g, '')) || 0;
            }
        });
        const totalCell = table.querySelector('tr:last-child td:last-child');
        totalCell.textContent = total.toLocaleString() + ' 円';
    }

    initCalculationBox(1);
    initCalculationBox(2);

    //エクセルに出力
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
