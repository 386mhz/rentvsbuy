# rentvsbuy
# 🏠 Ontario Rent vs Buy Investment Calculator

A comprehensive web-based calculator to help you make informed decisions about renting versus buying property in Ontario, Canada. This tool provides detailed financial analysis with Toronto-specific considerations and year-by-year projections.

## 📊 Features

### Core Functionality
- **30-Year Analysis**: Complete financial projection over 30 years
- **Period-Based Calculations**: Different rates for 0-5, 5-10, and 10+ year periods
- **Ontario-Specific**: Built-in Ontario and Toronto land transfer tax calculations
- **CMHC Insurance**: Automatic calculation based on down payment percentage
- **Investment Comparison**: Compares renting + investing vs. owning equity

### Key Metrics Tracked
- Monthly rent vs. mortgage payments
- Property taxes, maintenance, and insurance costs
- Investment portfolio growth for renters
- House appreciation and equity building
- Net worth comparison between renting and owning

### Visual Interface
- **Modern Design**: Gradient backgrounds with glassmorphism effects
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Results**: Highlighted comparison cards and detailed tables
- **Real-time Updates**: Automatic recalculation of dependent fields

## 🏗️ Built-in Assumptions

The calculator includes several built-in assumptions for Ontario residents:

- CMHC premium is capitalized to the mortgage
- Other closing costs are paid as cash
- Buyer is not a first-time homebuyer
- Property is located in Ontario
- Toronto land transfer tax applies (can be zeroed out for non-Toronto properties)

## 💰 Calculated Fields

Several fields are automatically calculated based on your inputs:

### Land Transfer Taxes
- **Ontario LTT**: Progressive rates from 0.5% to 2.5%
- **Toronto LTT**: Additional municipal tax for Toronto properties

### CMHC Insurance (for down payments < 20%)
- **15-19.99% down**: 2.8% of mortgage amount
- **10-14.99% down**: 3.1% of mortgage amount  
- **5-9.99% down**: 4.0% of mortgage amount

## 🎯 How to Use

### 1. Input Your Scenario
Fill in the form with your specific situation:

#### Renting Assumptions
- Initial monthly rent
- Expected annual rent increases
- Renters insurance as percentage of rent

#### Owning Assumptions
- House purchase price
- Down payment percentage
- Mortgage amortization period

#### Closing Costs
- Most fields auto-calculate
- Customize legal fees, inspections, etc.

#### Rate Assumptions by Period
Set different rates for three time periods:
- **Years 1-5**: Typically higher interest rates, lower maintenance
- **Years 6-10**: Moderate adjustments
- **Years 11+**: Long-term projections

### 2. Review Results

#### Summary Cards
Quick view of the financial advantage at key milestones:
- After 1, 5, 10, 20, and 30 years
- Positive values = renting is better
- Negative values = buying is better

#### Detailed Table
Year-by-year breakdown showing:
- Annual costs for renting vs. owning
- Investment portfolio value (renters)
- House value and equity (owners)
- Net financial advantage

### 3. Interpret the Results

The calculator shows the **net financial advantage** of renting vs. buying:
- **Positive values**: Renting leaves you financially ahead
- **Negative values**: Buying leaves you financially ahead
- Consider the 10-year mark as a key decision point

## 🔧 Technical Details

### Technology Stack
- **Frontend**: Pure HTML, CSS, and JavaScript
- **Styling**: Custom CSS with modern design patterns
- **Responsive**: CSS Grid and Flexbox for all screen sizes
- **No Dependencies**: Runs entirely in the browser

### File Structure
```
rent-vs-buy-calculator/
├── index.html          # Complete application
└── README.md          # This documentation
```

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- No server required - runs locally

## 📱 Responsive Design

The calculator adapts to different screen sizes:
- **Desktop**: Full multi-column layout
- **Tablet**: Adjusted grid layouts
- **Mobile**: Single-column stack with optimized spacing

## 🧮 Calculation Methodology

### Renting Path
1. Calculate annual rent + insurance costs
2. Invest the difference (down payment + monthly savings)
3. Apply investment returns with tax considerations
4. Account for rent increases over time

### Buying Path
1. Calculate mortgage payments with varying interest rates
2. Add property taxes, maintenance, and insurance
3. Track house appreciation and equity building
4. Account for opportunity cost of down payment

### Comparison
The tool compares the net worth of both scenarios:
- **Renter**: Investment portfolio value
- **Owner**: House equity minus remaining mortgage
- **Difference**: Accounts for initial cash investment

## 🎨 Customization

### Modifying Default Values
Edit the `value` attributes in the HTML input fields:

```html
<input type="number" id="monthlyRent" value="4200">
<input type="number" id="housePrice" value="1400000">
```

### Styling Changes
Modify the CSS variables in the `<style>` section:
- Colors: Update gradient backgrounds and accent colors
- Spacing: Adjust padding and margins
- Typography: Change font families and sizes

### Adding Features
The JavaScript is modular and well-commented:
- Add new input fields in HTML
- Extend calculation logic in `calculateComparison()`
- Update results display in `updateResults()`

## 📈 Default Assumptions

The calculator comes pre-loaded with realistic Ontario market assumptions:

### Financial Rates
- **Interest Rates**: 4.0% → 4.5% → 4.5% over time
- **Investment Returns**: 6.0% → 6.5% → 7.0% over time
- **House Appreciation**: 2.0% → 2.2% → 2.5% over time

### Property Costs (% of house value)
- **Maintenance**: 0.66% → 0.70% → 0.75% (increases with age)
- **Property Tax**: 0.60% → 0.62% → 0.65% (gradual increases)
- **Insurance**: 0.23% → 0.25% → 0.27% (inflation adjustment)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Suggestions and improvements are welcome! Consider contributing:
- Additional provincial tax calculations
- Enhanced mobile interface
- Export functionality for results
- Advanced scenario modeling

## ⚠️ Disclaimer

This calculator is for educational and planning purposes only. It should not be considered as financial advice. Consult with qualified financial advisors and real estate professionals before making major financial decisions.

Market conditions, interest rates, and personal circumstances can vary significantly. The calculator's projections are based on the assumptions you input and may not reflect actual future outcomes.
