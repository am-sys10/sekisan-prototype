// グローバル変数の定義
let methods = {};
let sealingMaterials = {};

// メイン初期化関数
async function initializeApp() {
    try {
        const [methodsData, sealingData] = await Promise.all([
            fetch('methods.json').then(response => response.json()),
            fetch('sealing_materials.json').then(response => response.json())
        ]);

        methods = methodsData;
        sealingMaterials = sealingData;
        initAllCalculations();
    } catch (error) {
        console.error('データの読み込みに失敗:', error);
        document.querySelector('.container').innerHTML = 
            '<div class="error-message">データの読み込みに失敗しました。ページを再読み込みしてください。</div>';
    }
}

// すべての計算ボックスの初期化
function initAllCalculations() {
    // 通常工法ボックスの作成
    ['1', '2'].forEach(num => {
        const template = document.getElementById('method-box-template');
        const clone = template.content.cloneNode(true);
        const box = clone.querySelector('.calculation-box');
        
        // テンプレート内の番号を置換
        box.querySelector('h2').textContent = `工法${num}`;
        setupRegularMethodBox(box, num);
        document.querySelector('.container').appendChild(box);
    });

// シーリング工法ボックスの作成
['1', '2'].forEach(num => {
    const template = document.getElementById('sealing-box-template');
    const clone = template.content.cloneNode(true);
    const box = clone.querySelector('.calculation-box');
    
    // テンプレート内の番号を置換
    if (num === '1') {
        box.querySelector('h2').textContent = 'シーリング工法';
    } else if (num === '2') {
        box.querySelector('h2').textContent = 'シーリング工法（ガラリ用）';
    }
    
    // タイプ固有の入力フィールドを追加
    const typeSpecificDiv = box.querySelector('.type-specific');
    if (num === '1') {
        typeSpecificDiv.innerHTML = `
            <label>長さ (m):</label>
            <input type="number" class="length-input" min="0">
        `;
    } else {
        typeSpecificDiv.innerHTML = `
            <label>直径 (mm):</label>
            <input type="number" class="diameter-input" min="0">
            <label>箇所数:</label>
            <input type="number" class="count-input" min="0">
        `;
    }

    setupSealingBox(box, num);
    document.querySelector('.container').appendChild(box);
});


    setupExcelExport();
}

// 通常工法ボックスのセットアップ
function setupRegularMethodBox(box, num) {
    const manufacturerSelect = box.querySelector('.manufacturer-select');
    const methodSelect = box.querySelector('.method-select');
    const addAreaBtn = box.querySelector('.add-area-btn');
    const calculateBtn = box.querySelector('.calculate-btn');

    // メーカーリストの設定
    const manufacturers = [...new Set(Object.values(methods).map(method => method.manufacturer))];
    populateSelect(manufacturerSelect, manufacturers);

    // イベントリスナーの設定
    manufacturerSelect.addEventListener('change', () => 
        updateMethodList(manufacturerSelect, methodSelect));
    
    addAreaBtn.addEventListener('click', () => 
        addAreaInput(box));
    
    calculateBtn.addEventListener('click', () => 
        calculateRegularMethod(box));

    setupAreaInputs(box);
}

// シーリング工法ボックスのセットアップ
function setupSealingBox(box, num) {
    const manufacturerSelect = box.querySelector('.manufacturer-select');
    const materialSelect = box.querySelector('.material-select');
    const calculateBtn = box.querySelector('.calculate-btn');

    // メーカーリストの設定
    const manufacturers = [...new Set(Object.values(sealingMaterials)
        .map(material => material.manufacturer))];
    populateSelect(manufacturerSelect, manufacturers);

    // イベントリスナーの設定
    manufacturerSelect.addEventListener('change', () => 
        updateSealingMaterialList(manufacturerSelect, materialSelect));
    
    calculateBtn.addEventListener('click', () => 
        calculateSealing(box, num));
}

// セレクトボックスの選択肢を設定
function populateSelect(select, items) {
    select.innerHTML = '<option value="">選択してください</option>';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

// 工法リストの更新
function updateMethodList(manufacturerSelect, methodSelect) {
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
}

// シーリング材料リストの更新
function updateSealingMaterialList(manufacturerSelect, materialSelect) {
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
}

// 面積入力関連の処理
function setupAreaInputs(box) {
    // 既存の削除ボタンにイベントリスナーを追加
    box.querySelectorAll('.remove-area-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const group = e.target.closest('.area-input-group');
            const container = group.closest('.areas-container');
            
            if (container.querySelectorAll('.area-input-group').length > 1) {
                group.remove();
                updateAreaTotal(box);
            }
        });
    });

    // 既存の入力フィールドにイベントリスナーを追加
    box.querySelectorAll('.area-input').forEach(input => {
        input.addEventListener('input', () => updateAreaTotal(box));
    });

    // 初期表示
    updateAreaTotal(box);
}

// 面積合計の更新
function updateAreaTotal(box) {
    const areaInputs = box.querySelectorAll('.area-input');
    const totalArea = Array.from(areaInputs)
        .map(input => parseFloat(input.value) || 0)
        .reduce((sum, area) => sum + area, 0);
    
    box.querySelector('.area-total span').textContent = totalArea.toFixed(2);
}

// 面積入力欄の追加
function addAreaInput(box) {
    const container = box.querySelector('.areas-container');
    const newGroup = document.createElement('div');
    newGroup.className = 'area-input-group';
    newGroup.innerHTML = `
        <input type="number" class="area-input" placeholder="面積を入力">
        <button class="remove-area-btn">削除</button>
    `;
    
    const totalDisplay = container.querySelector('.area-total');
    container.insertBefore(newGroup, totalDisplay);

    setupAreaInputs(box);
}

// 通常工法の計算実行
function calculateRegularMethod(box) {
    const totalArea = parseFloat(box.querySelector('.area-total span').textContent);
    const methodKey = box.querySelector('.method-select').value;
    const methodData = methods[methodKey];

    if (!methodKey || !methodData) {
        showError(box, '工法を選択してください');
        return;
    }

    if (totalArea <= 0) {
        showError(box, '面積を入力してください');
        return;
    }

    displayMethodResult(box, methodData, totalArea);
}

// シーリング工法の計算実行
function calculateSealing(box, type) {
    const materialKey = box.querySelector('.material-select').value;
    const materialData = sealingMaterials[materialKey];
    
    if (!materialKey || !materialData) {
        showError(box, '材料を選択してください');
        return;
    }

    const width = parseFloat(box.querySelector('.width-input').value) || 0;
    const depth = parseFloat(box.querySelector('.depth-input').value) || 0;
    const useHalf = box.querySelector('.half-calc').checked;

    let volume;
    if (type === '1') {
        const length = parseFloat(box.querySelector('.length-input').value) || 0;
        volume = (width * depth * length) / 1000;
    } else {
        const diameter = parseFloat(box.querySelector('.diameter-input').value) || 0;
        const count = parseFloat(box.querySelector('.count-input').value) || 0;
        volume = (3.14*width * depth * diameter * count ) /1000000;
    }

    if (volume <= 0) {
        showError(box, '正しい寸法を入力してください');
        return;
    }

    if (useHalf) {
        volume /= 2;
    }

// Convert capacity from ml to liters
    const capacityInLiters = materialData.capacity / 1000;
    const requiredAmount = volume / capacityInLiters;
    const requiredCans = Math.ceil(requiredAmount);

    displaySealingResult(box, {
        volume,
        requiredAmount,
        requiredCans,
        materialData
    });
}

// エラーメッセージの表示
function showError(box, message) {
    const resultDiv = box.querySelector('.result');
    resultDiv.innerHTML = `<div class="error-message">${message}</div>`;
}

// 通常工法の計算結果表示
function displayMethodResult(box, methodData, totalArea) {
    const resultDiv = box.querySelector('.result');
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    const table = createMethodResultTable(methodData, totalArea);
    tableContainer.appendChild(table);
    resultDiv.innerHTML = '';
    resultDiv.appendChild(tableContainer);
}

// シーリング工法の計算結果表示
function displaySealingResult(box, results) {
    const resultDiv = box.querySelector('.result');
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    
    const table = document.createElement('table');
    
    // テーブルヘッダーを別途作成
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>材料名</th>
            <th>必要使用量</th>
            <th>積算体積</th>
            <th>必要量</th>
            <th>積算数量</th>
            <th>搬入数量</th>
            <th>単価</th>
            <th>金額</th>
        </tr>
    `;
    table.appendChild(thead);

    // テーブルボディを作成
    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    dataRow.innerHTML = `
        <td>${results.materialData.name}</td>
        <td>1</td>
        <td>${results.volume.toFixed(2)}</td>
        <td>${results.volume.toFixed(2)}</td>
        <td>${results.requiredAmount.toFixed(2)}</td>
        <td>${results.requiredCans}</td>
        <td><input type="number" class="price-input" placeholder="単価"></td>
        <td class="cost">0</td>
    `;
    tbody.appendChild(dataRow);

    // 合計行を作成
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="7" style="text-align: right; font-weight: bold;">合計:</td>
        <td class="total">0</td>
    `;
    tbody.appendChild(totalRow);
    
    table.appendChild(tbody);

    setupPriceInput(table);
    resultDiv.innerHTML = '';
    tableContainer.appendChild(table);
    resultDiv.appendChild(tableContainer);
}

// 通常工法の結果テーブル作成
function createMethodResultTable(methodData, totalArea) {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>材料名</th>
            <th>必要使用量</th>
            <th>積算面積</th>
            <th>必要量</th>
            <th>積算数量</th>
            <th>搬入数量</th>
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

    // 価格入力のイベントリスナーを設定
    const priceInput = row.querySelector('.price-input');
    const costCell = row.querySelector('.cost');
    
    priceInput.addEventListener('input', (e) => {
        const price = parseFloat(e.target.value) || 0;
        const requiredCans = usage.requiredCans; // 整数値を使用
        const cost = requiredCans * price;
        costCell.textContent = cost.toLocaleString();
        updateTotalCost(row.closest('table'));
    });

    return row;
}

// 価格入力の設定（シーリング工法用）
function setupPriceInput(table) {
    table.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const row = e.target.closest('tr');
            const priceInput = parseFloat(e.target.value) || 0;
            const requiredCans = parseInt(row.querySelector('td:nth-child(6)').textContent) || 0; // 整数列（6列目）を参照
            const costCell = row.querySelector('.cost, .total-price');
            
            // 整数×単価で計算
            const cost = requiredCans * priceInput;
            costCell.textContent = cost.toLocaleString();
            updateTotalCost(table);
        });
    });
}

// 合計金額の更新
function updateTotalCost(table) {
    const costs = Array.from(table.querySelectorAll('.cost, .total-price'))
        .map(cell => parseInt(cell.textContent.replace(/,/g, '')) || 0);
    const total = costs.reduce((sum, cost) => sum + cost, 0);
    const totalCell = table.querySelector('tr:last-child td:last-child');
    totalCell.textContent = total.toLocaleString() + ' 円';
}

// Excelエクスポートの設定
function setupExcelExport() {
    document.getElementById('exportExcelBtn').addEventListener('click', () => {
        const workbook = XLSX.utils.book_new();
        
        // 全ての計算ボックスの結果を取得
        document.querySelectorAll('.calculation-box').forEach((box, index) => {
            const table = box.querySelector('table');
            if (table) {
                const ws = XLSX.utils.table_to_sheet(table);
                const sheetName = box.querySelector('h2').textContent;
                XLSX.utils.book_append_sheet(workbook, ws, sheetName);
            }
        });

        XLSX.writeFile(workbook, '見積もり.xlsx');
    });
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', initializeApp);
