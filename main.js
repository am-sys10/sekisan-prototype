// =========================
// グローバル変数の定義（JSONを直接組み込み）
// =========================

// methods.json の内容を直接埋め込み
const methods = {
  "sd-kk20t": {
    "name": "サラセーヌSD-KK20T(フッ素)",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "サラセーヌP": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌK": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "サラセーヌT": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 }
    }
  },
  "sd-kk30t": {
    "name": "サラセーヌSD-KK30T（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "サラセーヌP": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌK": { "usagePerSqM": 3.9, "capacity": 24, "usageFactor": 1 },
      "サラセーヌT": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "サラセーヌクロス＃2000": {
        "isAreaBased": true,
        "capacitySqM": 100,
        "usageFactor": 1
      }
    }
  },
  "sd-立上り20t": {
    "name": "サラセーヌSD-立上り20T（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "サラセーヌP": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌ立上り用": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "サラセーヌT": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "サラセーヌクロス＃4000": {
        "isAreaBased": true,
        "capacitySqM": 50,
        "usageFactor": 1
      }
    }
  },
  "sdn-立上り20t": {
    "name": "サラセーヌSDN-立上り20T（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "サラセーヌP": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌ立上り用": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "サラセーヌT": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 }
    }
  },
  "sd-ez30tj": {
    "name": "サラセーヌSD-EZ30TJ（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "PJプライマー": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌEZ": { "usagePerSqM": 3.9, "capacity": 24, "usageFactor": 1 },
      "TJトップ": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "TJフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "サラセーヌクロス＃2000": {
        "isAreaBased": true,
        "capacitySqM": 100,
        "usageFactor": 1
      }
    }
  },
  "sd-ez20tj": {
    "name": "サラセーヌSD-EZ20TJ（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "PJプライマー": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌEZ": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "TJトップ": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "TJフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 }
    }
  },
  "sd-ez立上り20t": {
    "name": "サラセーヌSD-EZ立上り20T（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "PJプライマー": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌEZ立上り用": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "TJトップ": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "TJフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "サラセーヌクロス＃4000": {
        "isAreaBased": true,
        "capacitySqM": 50,
        "usageFactor": 1
      }
    }
  },
  "sdn-ez立上り20t": {
    "name": "サラセーヌSDN-EZ立上り20T（フッ素）",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ密着工法",
    "materials": {
      "PJプライマー": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌEZ立上り用": { "usagePerSqM": 2.6, "capacity": 24, "usageFactor": 1 },
      "TJトップ": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "TJフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 }
    }
  },
  "qv-kk50t": {
    "name": "サラセーヌQV-KK50T(フッ素)",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ通気緩衝工法",
    "materials": {
      "サラセーヌP": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌK": { "usagePerSqM": 3.3, "capacity": 24, "usageFactor": 1 },
      "サラセーヌT": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "QVシート": { "isAreaBased": true, "capacitySqM": 15, "usageFactor": 1.06 },
      "ジョイントテープ": { "type": "tape2", "rollLength": 50, "capacity": 50, "usagePerSqM": 1 },
      "MBテープ": { "type": "tape1", "rollLength": 20, "capacity": 20, "usagePerSqM": 1 }
    }
  },
  "qv-ez50t": {
    "name": "サラセーヌQV-EZ50T(フッ素)",
    "manufacturer": "AGCポリマー建材",
    "category": "サラセーヌ通気緩衝工法",
    "materials": {
      "PJプライマー": { "usagePerSqM": 0.2, "capacity": 16, "usageFactor": 1 },
      "サラセーヌEZ": { "usagePerSqM": 3.3, "capacity": 24, "usageFactor": 1 },
      "TJトップ": { "usagePerSqM": 0.2, "capacity": 15, "usageFactor": 1 },
      "サラセーヌTフッ素": { "usagePerSqM": 0.15, "capacity": 8, "usageFactor": 1 },
      "QVシート": { "isAreaBased": true, "capacitySqM": 15, "usageFactor": 1.06 },
      "ジョイントテープ": { "type": "tape2", "rollLength": 50, "capacity": 50, "usagePerSqM": 1 },
      "MBテープ": { "type": "tape1", "rollLength": 20, "capacity": 20, "usagePerSqM": 1 }
    }
  }
  // ※ 他の工法データは必要に応じて追加してください
};

const sealingMaterials = {
  "ビルドシールSR": {
    "name": "ビルドシールSR",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "SAシール": {
    "name": "SAシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "MSシール": {
    "name": "MSシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "MSシール超耐久": {
    "name": "MSシール超耐久",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "サイディングシール": {
    "name": "サイディングシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "FRシール": {
    "name": "FRシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "PSシール": {
    "name": "PSシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "AUシール": {
    "name": "AUシール",
    "manufacturer": "コニシ2液",
    "capacity": 4000,
    "unit": "ml"
  },
  "ビューシール6909": {
    "name": "ビューシール6909",
    "manufacturer": "コニシ2液",
    "capacity": 6000,
    "unit": "ml"
  },
  "シリコンコーク": {
    "name": "シリコンコーク",
    "manufacturer": "コニシ1液",
    "capacity": 330,
    "unit": "ml"
  },
  "MSコーク": {
    "name": "MSコーク",
    "manufacturer": "コニシ1液",
    "capacity": 330,
    "unit": "ml"
  },
  "SRシールS70": {
    "name": "SRシールS70",
    "manufacturer": "コニシ1液",
    "capacity": 320,
    "unit": "ml"
  },
  "耐火目地用シーラント": {
    "name": "耐火目地用シーラント",
    "manufacturer": "コニシ1液",
    "capacity": 333,
    "unit": "ml"
  },
  "AUクイック": {
    "name": "AUクイック",
    "manufacturer": "コニシ1液",
    "capacity": 333,
    "unit": "ml"
  },
  "ウレタンコーク": {
    "name": "ウレタンコーク",
    "manufacturer": "コニシ1液",
    "capacity": 320,
    "unit": "ml"
  },
  "防火下地コーク": {
    "name": "防火下地コーク",
    "manufacturer": "コニシ1液",
    "capacity": 320,
    "unit": "ml"
  },
  "ペンギン2550NB": {
    "name": "ペンギン2550NB",
    "manufacturer": "サンスター",
    "capacity": 4000,
    "unit": "ml"
  }
};

// =========================
// アプリケーション初期化（fetchは使わず、直接JSONを利用）
// =========================
document.addEventListener('DOMContentLoaded', () => {
  initAllCalculations();
});

/* =========================
   カテゴリ更新関連の関数
   ========================= */
// メーカー選択後にカテゴリ選択肢を設定
function updateCategoryList(manufacturerSelect, categorySelect) {
  const selectedManufacturer = manufacturerSelect.value;
  const categories = new Set();
  Object.values(methods).forEach(method => {
    if (method.manufacturer === selectedManufacturer && method.category) {
      categories.add(method.category);
    }
  });
  categorySelect.innerHTML = '<option value="">カテゴリ選択</option>';
  Array.from(categories).forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// カテゴリ選択後に工法選択肢を更新
function updateMethodListByCategory(manufacturerSelect, categorySelect, methodSelect) {
  const selectedManufacturer = manufacturerSelect.value;
  const selectedCategory = categorySelect.value;
  methodSelect.innerHTML = '<option value="">工法を選択してください</option>';
  Object.entries(methods).forEach(([key, method]) => {
    if (method.manufacturer === selectedManufacturer) {
      if (!selectedCategory || (method.category && method.category === selectedCategory)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = method.name;
        methodSelect.appendChild(option);
      }
    }
  });
}
// =========================
// 従来の関数群（計算、表示、エクスポート等）
// =========================

// 通常工法ボックスの初期化
function initAllCalculations() {
  // 通常工法ボックスの作成
  ['1', '2'].forEach(num => {
    const template = document.getElementById('method-box-template');
    const clone = template.content.cloneNode(true);
    const box = clone.querySelector('.calculation-box');
    box.querySelector('h2').textContent = `工法${num}`;
    setupRegularMethodBox(box, num);
    document.querySelector('.container').appendChild(box);
  });
  // シーリング工法ボックスの作成
  ['1', '2'].forEach(num => {
    const template = document.getElementById('sealing-box-template');
    const clone = template.content.cloneNode(true);
    const box = clone.querySelector('.calculation-box');
    box.querySelector('h2').textContent = num === '1' ? 'シーリング工法' : 'シーリング工法（ガラリ用）';
    setupSealingBox(box, num);
    document.querySelector('.container').appendChild(box);
  });
  setupExcelExport();
}

// 通常工法ボックスのセットアップ（カテゴリ対応）
function setupRegularMethodBox(box, num) {
  const manufacturerSelect = box.querySelector('.manufacturer-select');
  const categorySelect = box.querySelector('.category-select');
  const methodSelect = box.querySelector('.method-select');
  const addAreaBtn = box.querySelector('.add-area-btn');
  const calculateBtn = box.querySelector('.calculate-btn');

  const manufacturers = [...new Set(Object.values(methods).map(method => method.manufacturer))];
  populateSelect(manufacturerSelect, manufacturers);

  manufacturerSelect.addEventListener('change', () => {
    updateCategoryList(manufacturerSelect, categorySelect);
    updateMethodListByCategory(manufacturerSelect, categorySelect, methodSelect);
  });

  categorySelect.addEventListener('change', () => {
    updateMethodListByCategory(manufacturerSelect, categorySelect, methodSelect);
  });

  addAreaBtn.addEventListener('click', () => addAreaInput(box));
  calculateBtn.addEventListener('click', () => calculateRegularMethod(box));

  const initialAreaInput = box.querySelector('.area-input');
  initialAreaInput.addEventListener('input', () => updateAreaTotal(box));
  const initialRemoveBtn = box.querySelector('.remove-area-btn');
  initialRemoveBtn.addEventListener('click', (e) => {
    const group = e.target.closest('.area-input-group');
    const container = group.closest('.areas-container');
    if (container.querySelectorAll('.area-input-group').length > 1) {
      group.remove();
      updateAreaTotal(box);
    }
  });
  updateAreaTotal(box);
}

// シーリング工法ボックスのセットアップ
function setupSealingBox(box, num) {
    const manufacturerSelect = box.querySelector('.manufacturer-select');
    const materialSelect = box.querySelector('.material-select');
    const calculateBtn = box.querySelector('.calculate-btn');
    const typeSpecificDiv = box.querySelector('.type-specific');

    // タイプごとの入力フィールドの変更
    if (num === '1') {
        // 通常のシーリング工法（長さを入力）
        typeSpecificDiv.innerHTML = `
            <div class="input-group">
                <label>長さ (m):</label>
                <input type="number" class="length-input" min="0">
            </div>
        `;
    } else {
        // ガラリ用のシーリング工法（直径と箇所数）
        typeSpecificDiv.innerHTML = `
            <div class="input-group">
                <label>直径 (mm):</label>
                <input type="number" class="diameter-input" min="0">
            </div>
            <div class="input-group">
                <label>箇所数:</label>
                <input type="number" class="count-input" min="0">
            </div>
        `;
    }

    // メーカーリストの設定
    const manufacturers = [...new Set(Object.values(sealingMaterials).map(material => material.manufacturer))];
    populateSelect(manufacturerSelect, manufacturers);

    // イベントリスナーの設定
    manufacturerSelect.addEventListener('change', () => 
        updateSealingMaterialList(manufacturerSelect, materialSelect));
    
    calculateBtn.addEventListener('click', () => 
        calculateSealing(box, num));
}

function populateSelect(select, items) {
  select.innerHTML = '<option value="">選択してください</option>';
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

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

function updateAreaTotal(box) {
  const areaInputs = box.querySelectorAll('.area-input');
  const totalArea = Array.from(areaInputs)
    .map(input => parseFloat(input.value) || 0)
    .reduce((sum, area) => sum + area, 0);
  box.querySelector('.area-total span').textContent = totalArea.toFixed(2);
}

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
  const removeBtn = newGroup.querySelector('.remove-area-btn');
  removeBtn.addEventListener('click', () => {
    if (container.querySelectorAll('.area-input-group').length > 1) {
      newGroup.remove();
      updateAreaTotal(box);
    }
  });
  const areaInput = newGroup.querySelector('.area-input');
  areaInput.addEventListener('input', () => updateAreaTotal(box));
  updateAreaTotal(box);
}

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
    volume = (3.14 * width * depth * diameter * count) / 1000000;
  }
  if (volume <= 0) {
    showError(box, '正しい寸法を入力してください');
    return;
  }
  if (useHalf) { volume /= 2; }
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

function showError(box, message) {
  const resultDiv = box.querySelector('.result');
  resultDiv.innerHTML = `<div class="error-message">${message}</div>`;
}

function displayMethodResult(box, methodData, totalArea) {
  const resultDiv = box.querySelector('.result');
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';
  const table = createMethodResultTable(methodData, totalArea);
  tableContainer.appendChild(table);
  resultDiv.innerHTML = '';
  resultDiv.appendChild(tableContainer);
}

function displaySealingResult(box, results) {
  const resultDiv = box.querySelector('.result');
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';
  const table = document.createElement('table');
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
  const priceInput = row.querySelector('.price-input');
  const costCell = row.querySelector('.cost');
  priceInput.addEventListener('input', (e) => {
    const price = parseFloat(e.target.value) || 0;
    const cost = usage.requiredCans * price;
    costCell.textContent = cost.toLocaleString();
    updateTotalCost(row.closest('table'));
  });
  return row;
}

function setupPriceInput(table) {
  table.querySelectorAll('.price-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const row = e.target.closest('tr');
      const priceInput = parseFloat(e.target.value) || 0;
      const requiredCans = parseInt(row.querySelector('td:nth-child(6)').textContent) || 0;
      const costCell = row.querySelector('.cost, .total-price');
      const cost = requiredCans * priceInput;
      costCell.textContent = cost.toLocaleString();
      updateTotalCost(table);
    });
  });
}

function updateTotalCost(table) {
  const costs = Array.from(table.querySelectorAll('.cost, .total-price'))
    .map(cell => parseInt(cell.textContent.replace(/,/g, '')) || 0);
  const total = costs.reduce((sum, cost) => sum + cost, 0);
  const totalCell = table.querySelector('tr:last-child td:last-child');
  totalCell.textContent = total.toLocaleString() + ' 円';
}

function setupExcelExport() {
  document.getElementById('exportExcelBtn').addEventListener('click', () => {
    const workbook = XLSX.utils.book_new();
    document.querySelectorAll('.calculation-box').forEach((box) => {
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
