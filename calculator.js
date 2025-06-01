function calculateComparison() {
    // Get input values
    const housePrice = parseFloat(document.getElementById('housePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value) / 100;
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
    const amortizationYears = parseInt(document.getElementById('amortization').value);
    
    // Interest rates
    const interestRate1 = parseFloat(document.getElementById('interestRate1').value) / 100;
    const interestRate2 = parseFloat(document.getElementById('interestRate2').value) / 100;
    const interestRate3 = parseFloat(document.getElementById('interestRate3').value) / 100;
    
    // Closing costs
    const titleInsurance = parseFloat(document.getElementById('titleInsurance').value);
    const legalFees = parseFloat(document.getElementById('legalFees').value);
    const homeInspection = parseFloat(document.getElementById('homeInspection').value);
    
    // Property costs by period
    const maintenanceRates = [
        parseFloat(document.getElementById('maintenanceRate1').value) / 100,
        parseFloat(document.getElementById('maintenanceRate2').value) / 100,
        parseFloat(document.getElementById('maintenanceRate3').value) / 100
    ];
    const propertyTaxRates = [
        parseFloat(document.getElementById('propertyTaxRate1').value) / 100,
        parseFloat(document.getElementById('propertyTaxRate2').value) / 100,
        parseFloat(document.getElementById('propertyTaxRate3').value) / 100
    ];
    const insuranceRates = [
        parseFloat(document.getElementById('insuranceRate1').value) / 100,
        parseFloat(document.getElementById('insuranceRate2').value) / 100,
        parseFloat(document.getElementById('insuranceRate3').value) / 100
    ];
    const appreciationRates = [
        parseFloat(document.getElementById('appreciationRate1').value) / 100,
        parseFloat(document.getElementById('appreciationRate2').value) / 100,
        parseFloat(document.getElementById('appreciationRate3').value) / 100
    ];
    
    // Investment and economic by period
    const investmentReturns = [
        parseFloat(document.getElementById('investmentReturn1').value) / 100,
        parseFloat(document.getElementById('investmentReturn2').value) / 100,
        parseFloat(document.getElementById('investmentReturn3').value) / 100
    ];

    const rentersInsuranceRate = parseFloat(document.getElementById('rentersInsurancePercent').value) / 100;
    const rentIncrease = parseFloat(document.getElementById('rentIncrease').value) / 100;
    const investmentTaxRate = parseFloat(document.getElementById('investmentTaxRate').value) / 100;

    // Calculate initial values
    const downPayment = housePrice * downPaymentPercent;
    const mortgageAmount = housePrice - downPayment;
    
    // Calculate CMHC insurance if down payment < 20%
    let cmhcInsurance = 0;
    if (downPaymentPercent < 0.20) {
        if (downPaymentPercent >= 0.15) {
            cmhcInsurance = mortgageAmount * 0.028;
        } else if (downPaymentPercent >= 0.10) {
            cmhcInsurance = mortgageAmount * 0.031;
        } else {
            cmhcInsurance = mortgageAmount * 0.04;
        }
    }
    
    // Toronto-specific closing costs
    const ontarioLandTransferTax = calculateOntarioLTT(housePrice);
    const torontoLandTransferTax = calculateTorontoLTT(housePrice);
    
    // Update readonly fields
    document.getElementById('ontarioLTT').value = Math.round(ontarioLandTransferTax);
    document.getElementById('torontoLTT').value = Math.round(torontoLandTransferTax);
    document.getElementById('cmhcInsurance').value = Math.round(cmhcInsurance);
    
    const closingCosts = ontarioLandTransferTax + torontoLandTransferTax + titleInsurance + legalFees + homeInspection;
    const totalCashForPurchase = downPayment + closingCosts;
    const totalMortgage = mortgageAmount + cmhcInsurance;

    // Initialize arrays for year-by-year calculations
    let results = [];
    let currentRent = monthlyRent;
    let investmentPortfolio = totalCashForPurchase;
    let mortgageBalance = totalMortgage;
    let currentHouseValue = housePrice;

    for (let year = 1; year <= 30; year++) {
        // Determine period (0=first 5, 1=next 5, 2=final 20)
        let period = year <= 5 ? 0 : (year <= 10 ? 1 : 2);
        
        // Get current rates based on period
        const currentInterestRate = period === 0 ? interestRate1 : (period === 1 ? interestRate2 : interestRate3);
        const currentMaintenanceRate = maintenanceRates[period];
        const currentPropertyTaxRate = propertyTaxRates[period];
        const currentInsuranceRate = insuranceRates[period];
        const currentAppreciationRate = appreciationRates[period];
        const currentInvestmentReturn = investmentReturns[period];

        // Calculate mortgage payment (if still paying)
        const remainingYears = Math.max(0, amortizationYears - (year - 1));
        let monthlyMortgagePayment = 0;
        let annualMortgagePayment = 0;
        
        if (remainingYears > 0 && mortgageBalance > 0) {
            const monthlyRate = currentInterestRate / 12;
            const totalPayments = remainingYears * 12;
            
            if (monthlyRate > 0) {
                monthlyMortgagePayment = mortgageBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
            } else {
                monthlyMortgagePayment = mortgageBalance / totalPayments;
            }
            
            annualMortgagePayment = monthlyMortgagePayment * 12;
            
            // Update mortgage balance
            const interestPaid = mortgageBalance * currentInterestRate;
            const principalPaid = annualMortgagePayment - interestPaid;
            mortgageBalance = Math.max(0, mortgageBalance - principalPaid);
        }

        // Calculate annual costs
        const annualRent = currentRent * 12;
        const rentersInsurance = annualRent * rentersInsuranceRate;
        const totalRentCost = annualRent + rentersInsurance;
        
        const maintenance = currentHouseValue * currentMaintenanceRate;
        const propertyTax = currentHouseValue * currentPropertyTaxRate;
        const homeInsurance = currentHouseValue * currentInsuranceRate;
        
        const totalOwnershipCost = annualMortgagePayment + maintenance + propertyTax + homeInsurance;
        const renterAdvantage = totalOwnershipCost - totalRentCost;

        // Update investment portfolio (renter invests the difference)
        if (renterAdvantage > 0) {
            investmentPortfolio += renterAdvantage;
        }
        investmentPortfolio *= (1 + currentInvestmentReturn * (1 - investmentTaxRate));

        // Update house value
        currentHouseValue *= (1 + currentAppreciationRate);

        // Calculate owner's equity
        const ownerEquity = currentHouseValue - mortgageBalance;

        // Calculate net position difference (positive means renting is better)
        const renterNetWorth = investmentPortfolio;
        const ownerNetWorth = ownerEquity;
        const difference = renterNetWorth - ownerNetWorth + totalCashForPurchase;

        results.push({
            year: year,
            rentCost: totalRentCost,
            ownCost: totalOwnershipCost,
            renterAdvantage: renterAdvantage,
            investmentValue: investmentPortfolio,
            houseValue: currentHouseValue,
            difference: difference
        });

        // Update rent for next year
        currentRent *= (1 + rentIncrease);
    }

    // Update UI with results
    updateResults(results);
}

function calculateOntarioLTT(price) {
    let tax = 0;
    if (price <= 55000) {
        tax = price * 0.005;
    } else if (price <= 250000) {
        tax = 275 + (price - 55000) * 0.01;
    } else if (price <= 400000) {
        tax = 2225 + (price - 250000) * 0.015;
    } else if (price <= 2000000) {
        tax = 4475 + (price - 400000) * 0.02;
    } else {
        tax = 36475 + (price - 2000000) * 0.025;
    }
    return tax;
}

function calculateTorontoLTT(price) {
    let tax = 0;
    if (price <= 55000) {
        tax = price * 0.005;
    } else if (price <= 400000) {
        tax = 275 + (price - 55000) * 0.01;
    } else if (price <= 2000000) {
        tax = 3725 + (price - 400000) * 0.02;
    } else {
        tax = 35725 + (price - 2000000) * 0.025;
    }
    return tax;
}

function updateResults(results) {
    // Update summary cards
    const result1 = results[0]; // Year 1
    const result5 = results[4]; // Year 5
    const result10 = results[9]; // Year 10
    const result20 = results[19]; // Year 20
    const result30 = results[29]; // Year 30

    // Helper function to update card with winner indication
    function updateCard(elementId, result) {
        const element = document.getElementById(elementId);
        const card = element.closest('.comparison-card');

        // Remove existing winner class
        card.classList.remove('winner');

        if (result.difference > 0) {
            // Renting is better
            element.innerHTML = `${formatCurrency(result.difference)}<div style="font-size: 0.7rem; color: #28a745; font-weight: 600; margin-top: 5px;">📈 RENT BETTER</div>`;
            card.classList.add('winner');
        } else {
            // Buying is better
            element.innerHTML = `${formatCurrency(result.difference)}<div style="font-size: 0.7rem; color: #dc3545; font-weight: 600; margin-top: 5px;">🏠 BUY BETTER</div>`;
        }
    }

    updateCard('result1', result1);
    updateCard('result5', result5);
    updateCard('result10', result10);
    updateCard('result20', result20);
    updateCard('result30', result30);

    // Update summary highlight based on 10-year result
    const summaryElement = document.getElementById('summaryResult');
    if (result10.difference > 0) {
        summaryElement.innerHTML = `
            <h3>🏆 Renting Provides A Better Return 🏆</h3>
            <p>After 10 years, renting is better than buying by <strong>${formatCurrency(result10.difference)}</strong></p>
        `;
    } else {
        summaryElement.innerHTML = `
            <h3>🏠 Buying Provides A Better Return 🏠</h3>
            <p>After 10 years, buying is better than renting by <strong>${formatCurrency(Math.abs(result10.difference))}</strong></p>
        `;
    }

    // Update detailed table - show all years initially, then every 5 years
    const tbody = document.getElementById('detailedResults');
    tbody.innerHTML = '';
    
    results.forEach((result, index) => {
        // Show years 1-10, then every 5 years
        if (index < 10 || (index + 1) % 5 === 0) {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${result.year}</td>
                <td>${formatCurrency(result.rentCost)}</td>
                <td>${formatCurrency(result.ownCost)}</td>
                <td style="color: ${result.difference > 0 ? '#28a745' : '#dc3545'}">${formatCurrency(result.difference)}</td>
                <td>${formatCurrency(result.investmentValue)}</td>
                <td>${formatCurrency(result.houseValue)}</td>
            `;
        }
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function updateCalculatedFields() {
    const housePrice = parseFloat(document.getElementById('housePrice').value) || 0;
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value) / 100 || 0;
    const isTorontoProperty = document.getElementById('propertyInToronto').checked;
    const ontarioLTTField = document.getElementById('ontarioLTT');
    const torontoLTTField = document.getElementById('torontoLTT');
    const cmhcField = document.getElementById('cmhcInsurance');

    // Update land transfer taxes
    document.getElementById('ontarioLTT').value = Math.round(calculateOntarioLTT(housePrice));
    ontarioLTTField.setAttribute('readonly', 'readonly');
    
    // Only calculate Toronto LTT if property is in Toronto
    if (isTorontoProperty) {
        document.getElementById('torontoLTT').value = Math.round(calculateTorontoLTT(housePrice));
    } else {
        document.getElementById('torontoLTT').value = 0;
    }
    torontoLTTField.setAttribute('readonly', 'readonly');
    
    // Update CMHC insurance
    const mortgageAmount = housePrice * (1 - downPaymentPercent);
    let cmhcInsurance = 0;
    if (downPaymentPercent < 0.20 && downPaymentPercent > 0.05) {
        if (downPaymentPercent >= 0.15) {
            cmhcInsurance = mortgageAmount * 0.028;
        } else if (downPaymentPercent >= 0.10) {
            cmhcInsurance = mortgageAmount * 0.031;
        } else {
            cmhcInsurance = mortgageAmount * 0.04;
        }
    }
    document.getElementById('cmhcInsurance').value = Math.round(cmhcInsurance);
    cmhcField.setAttribute('readonly', 'readonly');
}

// Add event listeners for auto-updating calculated fields
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('housePrice').addEventListener('input', updateCalculatedFields);
    document.getElementById('downPayment').addEventListener('input', updateCalculatedFields);
    
    // Initial calculation
    updateCalculatedFields();
    calculateComparison();
});