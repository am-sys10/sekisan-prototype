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
        this.setupRegularMethodBoxes();
        this.setupSealingBoxes();
        this.setupExcelExport();
    }

    setupRegularMethodBoxes() {
        const template = document.getElementById('method-box-template');
        [1, 2].forEach(num => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('h2').textContent = `工法${num}`;
            const box = this.setupCalculationBox(clone, num);
            document.querySelector('.container').appendChild(box);
        });
    }

    setupSealingBoxes() {
        ['1', '2'].forEach(num => {
            const template = document.getElementById(`sealing-box-template-${num}`);
            const clone = template.content.cloneNode(true);
            this.setupSealingBox(clone, num);
            document.querySelector('.container').appendChild(clone);
        });
    }

    setupCalculationBox(boxElement, num) {
        const manufacturerSelect = boxElement.querySelector('.manufacturer-select');
        const methodSelect = boxElement.querySelector('.method-select');
        
        const manufacturers = [...new Set(Object.values(this.methods)
            .map(method => method.manufacturer))];
        
        this.populateSelect(manufacturerSelect, manufacturers);
        
        manufacturerSelect.addEventListener('change', () => 
            this.updateMethodList(manufacturerSelect, methodSelect));
            
        boxElement.querySelector('.add-area-btn')
            .addEventListener('click', () => this.addAreaInput(boxElement));
            
        boxElement.querySelector('.calculate-btn')
            .addEventListener('click', () => this.calculate(boxElement));

        this.setupAreaInputs(boxElement);
        
        return boxElement;
    }

    setupSealingBox(boxElement, type) {
        const manufacturerSelect = boxElement.querySelector('.manufacturer-select');
        const materialSelect = boxElement.querySelector('.material-select');
        
        const manufacturers = [...new Set(Object.values(this.sealingMaterials)
            .map(material => material.manufacturer))];
        this.populateSelect(manufacturerSelect, manufacturers);

        manufacturerSelect.addEventListener('change', () => 
            this.updateSealingMaterialList(manufacturerSelect, materialSelect));
        
        boxElement.querySelector('.calculate-btn')
            .addEventListener('click', () => this.calculateSealing(boxElement, type));
    }

    setupAreaInputs(boxElement) {
        const updateTotal = () => {
            const inputs = boxElement.querySelectorAll('.area-input');
            const total = Array.from(inputs)
                .reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
            boxElement.querySelector('.area-total span').textContent = total.toFixed(2);
        };

        boxElement.querySelectorAll('.area-input').forEach(input => {
            input.addEventListener('input', updateTotal);
        });

        boxElement.querySelectorAll('.remove-area-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = e.target.closest('.area-input-group');
                if (boxElement.querySelectorAll('.area-input-group').length > 1) {
                    group.remove();
                    updateTotal();
                }
            });
        });
    }

    addAreaInput(boxElement) {
        const container = boxElement.querySelector('.areas-container');
        const newGroup = document.createElement('div');
        newGroup.className = 'area-input-group';
        newGroup.innerHTML = `
            <input type="number" class="area-input" placeholder="面積を入力">
            <button class="remove-area-btn">削除</button>
        `;

        const totalElement = container.querySelector('.area-total');
        container.insertBefore(newGroup, totalElement);
        this.setupAreaInputs(boxElement);
    }

    calculateSealing(boxElement, type) {
        const materialKey = boxElement.querySelector('.material-select').value;
        const materialData = this.sealingMaterials[materialKey];
        const useHalf = boxElement.querySelector('.half-calc').checked;
        
        if (!materialKey || !materialData) {
            alert('材料を選択してください');
            return;
        }

        let volume;
        if (type === '1') {
            const width = parseFloat(boxElement.querySelector('.width-input').value) || 0;
            const depth = parseFloat(boxElement.querySelector('.depth-input').value) || 0;
            const length = parseFloat(boxElement.querySelector('.length-input').value) || 0;
            volume = (width * depth * length) / 1000;
        } else {
            const width = parseFloat(boxElement.querySelector('.width-input').value) || 0;
            const depth = parseFloat(boxElement.querySelector('.depth-input').value) || 0;
            const diameter = parseFloat(boxElement.querySelector('.diameter-input').value) || 0;
            const count = parseFloat(boxElement.querySelector('.count-input').value) || 0;
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

    calculate(boxElement) {
        const methodKey = boxElement.querySelector('.method-select').value;
        const methodData = this.methods[methodKey];
        const totalArea = parseFloat(boxElement.querySelector('.area-total span').textContent);

        if (!methodKey || !methodData || totalArea <= 0) {
            alert('正しい入力値を選択してください');
            return;
        }

        this.displayResult(boxElement, methodData, totalArea);
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

    displayResult(boxElement, methodData, totalArea) {
        const resultDiv = boxElement.querySelector('.result');
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

        Object.entries(methodData.materials).forEach(([name, data]) => {
            const row = this.createMaterialRow(name, data, totalArea);
            table.appendChild(row);
        });

        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="7" style="text-align: right; font-weight: bold;">合計:</td>
            <td class="total">0</td>
        `;
        table.appendChild(totalRow);

        resultDiv.innerHTML = '';
        resultDiv.appendChild(table);
    }

    createMaterialRow(materialName, materialData, totalArea) {
        const row = document.createElement('tr');
        const usage = this.calculateMaterialUsage(materialData, totalArea);

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

        priceInput.addEventListener('input', () => {
            const price = parseFloat(priceInput.value) || 0;
            const cost = price * usage.requiredCans;
            costCell.textContent = cost.toLocaleString();
            this.updateTotalCost(row.closest('table'));
        });

        return row;
    }

    calculateMaterialUsage(materialData, totalArea) {
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

    updateTotalCost(table) {
        const costs = Array.from(table.querySelectorAll('.cost'))
            .map(cell => parseInt(cell.textContent.replace(/,/g, '')) || 0);
        const total = costs.reduce((sum, cost) => sum + cost, 0);
        table.querySelector('.total').textContent = total.toLocaleString() + ' 円';
    }

    updateMethodList(manufacturerSelect, methodSelect) {
        methodSelect.innerHTML = '<option value="">選択してください</option>';
        const selectedManufacturer = manufacturerSelect.value;
        
        Object.entries(this.methods).forEach(([key, method]) => {
            if (method.manufacturer === selectedManufacturer) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = method.name;
                methodSelect.appendChild(option);
            }
        });
    }

    updateSealingMaterialList(manufacturerSelect, materialSelect) {
        materialSelect.innerHTML = '<option value="">選択してください</option>';
        const selectedManufacturer = manufacturerSelect.value;
        
        Object.entries(this.sealingMaterials).forEach(([key, material]) => {
            if (material.manufacturer === selectedManufacturer) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = material.name;
                materialSelect.appendChild(option);
            }
        });
    }

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
                    const boxType = box.classList.contains('sealing-box') 
                        ? 'シーリング工法' 
                        : '工法';
                    XLSX.utils.book_append_sheet(workbook, ws, `${boxType}${index + 1}`);
                }
            });
            XLSX.writeFile(workbook, '見積もり.xlsx');
        });
    }
}

// アプリケーションの初期化
new MaterialCalculator();
