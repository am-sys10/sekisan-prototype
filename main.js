class MaterialCalculator {
    constructor() {
        this.methods = {};
        this.sealingMaterials = {};
        this.init();
    }

    async init() {
        try {
            const [methodsResponse, sealingResponse] = await Promise.all([
                fetch('methods.json'),
                fetch('sealing_materials.json')
            ]);
            this.methods = await methodsResponse.json();
            this.sealingMaterials = await sealingResponse.json();
            this.setupAllCalculationBoxes();
        } catch (error) {
            console.error('データの読み込みに失敗:', error);
        }
    }

    setupAllCalculationBoxes() {
        // 既存の工法ボックスのセットアップ
        this.setupRegularMethodBoxes();
        // シーリング工法ボックスのセットアップ
        this.setupSealingBoxes();
        this.setupExcelExport();
    }

    setupSealingBoxes() {
        ['1', '2'].forEach(num => {
            const template = document.getElementById(`sealing-box-template-${num}`);
            const clone = template.content.cloneNode(true);
            this.setupSealingBox(clone, num);
            document.querySelector('.container').appendChild(clone);
        });
    }

    setupSealingBox(boxElement, type) {
        const manufacturerSelect = boxElement.querySelector('.manufacturer-select');
        const materialSelect = boxElement.querySelector('.material-select');
        
        // メーカーリストの設定
        const manufacturers = [...new Set(Object.values(this.sealingMaterials)
            .map(material => material.manufacturer))];
        this.populateSelect(manufacturerSelect, manufacturers);

        // イベントリスナーの設定
        manufacturerSelect.addEventListener('change', () => 
            this.updateSealingMaterialList(manufacturerSelect, materialSelect));
        
        boxElement.querySelector('.calculate-btn')
            .addEventListener('click', () => this.calculateSealing(boxElement, type));
    }

    calculateSealing(boxElement, type) {
        const materialKey = boxElement.querySelector('.material-select').value;
        const materialData = this.sealingMaterials[materialKey];
        const useHalf = boxElement.querySelector('.half-calc').checked;
        
        let volume;
        if (type === '1') {
            // 工法1の計算: 巾×深さ×長さ÷1000
            const width = parseFloat(boxElement.querySelector('.width-input').value);
            const depth = parseFloat(boxElement.querySelector('.depth-input').value);
            const length = parseFloat(boxElement.querySelector('.length-input').value);
            volume = (width * depth * length) / 1000;
        } else {
            // 工法2の計算: 巾×深さ×直径×箇所数÷1000
            const width = parseFloat(boxElement.querySelector('.width-input').value);
            const depth = parseFloat(boxElement.querySelector('.depth-input').value);
            const diameter = parseFloat(boxElement.querySelector('.diameter-input').value);
            const count = parseFloat(boxElement.querySelector('.count-input').value);
            volume = (width * depth * diameter * count) / 1000;
        }

        if (useHalf) {
            volume /= 2;
        }

        const requiredAmount = volume / materialData.capacity;
        const requiredCans = Math.ceil(requiredAmount);

        this.displaySealingResult(boxElement, {
            volume,
            requiredAmount,
            requiredCans,
            materialData
        });
    }

    displaySealingResult(boxElement, results) {
        const resultDiv = boxElement.querySelector('.result');
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
class MaterialCalculator {
    constructor() {
        this.methods = {};
        this.init();
    }

    async init() {
        try {
            const response = await fetch('methods.json');
            this.methods = await response.json();
            this.setupCalculationBoxes();
        } catch (error) {
            console.error('データの読み込みに失敗:', error);
        }
    }

    setupCalculationBoxes() {
        const template = document.getElementById('method-box-template');
        [1, 2].forEach(num => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('h2').textContent = `工法${num}`;
            
            const box = this.setupCalculationBox(clone, num);
            document.querySelector('.container').appendChild(box);
        });

        this.setupExcelExport();
    }

    setupCalculationBox(boxElement, num) {
        const manufacturerSelect = boxElement.querySelector('.manufacturer-select');
        const methodSelect = boxElement.querySelector('.method-select');
        
        // メーカーリストの設定
        const manufacturers = [...new Set(Object.values(this.methods)
            .map(method => method.manufacturer))];
        
        this.populateSelect(manufacturerSelect, manufacturers);
        
        // イベントリスナーの設定
        manufacturerSelect.addEventListener('change', () => 
            this.updateMethodList(manufacturerSelect, methodSelect));
            
        boxElement.querySelector('.add-area-btn')
            .addEventListener('click', () => this.addAreaInput(boxElement));
            
        boxElement.querySelector('.calculate-btn')
            .addEventListener('click', () => this.calculate(boxElement));

        // 既存の面積入力欄の設定
        this.setupAreaInputs(boxElement);
        
        return boxElement;
    }

    calculateMaterialRequirements(totalArea, materialData) {
        let calculatedArea = totalArea;
        let usagePerUnit = materialData.usagePerSqM || 1;

        if (materialData.type === 'tape1') {
            calculatedArea = Math.sqrt(totalArea) * 4;
        } else if (materialData.type === 'tape2') {
            calculatedArea = (totalArea / 10) * 9;
        }

        const requiredAmount = calculatedArea * usagePerUnit * (materialData.usageFactor || 1);
        const capacity = materialData.capacity || materialData.capacitySqM;
        const requiredCans = Math.ceil(requiredAmount / capacity);

        return {
            calculatedArea,
            usagePerUnit,
            requiredAmount,
            requiredCans,
            requiredCansDecimal: (requiredAmount / capacity).toFixed(2)
        };
    }

    calculate(boxElement) {
        const totalArea = this.getTotalArea(boxElement);
        const methodData = this.methods[boxElement.querySelector('.method-select').value];

        if (totalArea <= 0 || !methodData) return;

        const table = this.createResultTable(totalArea, methodData);
        const resultDiv = boxElement.querySelector('.result');
        resultDiv.innerHTML = '';
        resultDiv.appendChild(table);
    }

    // その他の補助メソッド
    populateSelect(select, items) {
        select.innerHTML = '<option value="">選択してください</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }

    setupExcelExport() {
        document.getElementById('exportExcelBtn').addEventListener('click', () => {
            const workbook = XLSX.utils.book_new();
            document.querySelectorAll('.calculation-box').forEach((box, index) => {
                const table = box.querySelector('table');
                if (table) {
                    const ws = XLSX.utils.table_to_sheet(table);
                    XLSX.utils.book_append_sheet(workbook, ws, `工法${index + 1}`);
                }
            });
            XLSX.writeFile(workbook, '見積もり.xlsx');
        });
    }
}

// アプリケーションの初期化
new MaterialCalculator();
