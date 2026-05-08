const form = document.getElementById('elevator-form');
const schemeTitle = document.getElementById('scheme-title');
const schemeImage = document.getElementById('scheme-image');
const schemeDescription = document.getElementById('scheme-description');
const doorWidthResult = document.getElementById('door-width-result');
const carSizeResult = document.getElementById('car-size-result');
const loadInput = document.getElementById('load');

const schemes = {
    residential: {
        title: 'Residential Elevator Scheme',
        description: 'Ideal for apartment buildings and private homes, focusing on comfort, low noise, and energy efficiency.',
        image: 'https://xinfuji.com/wp-content/uploads/2024/05/FJ-K015.jpg'
    },
    commercial: {
        title: 'Commercial Elevator Scheme',
        description: 'Designed for office buildings and shopping centers with high traffic. Emphasizes durability, speed, and capacity.',
        image: 'https://xinfuji.com/wp-content/uploads/2024/05/FJ-K028.jpg'
    },
    hospital: {
        title: 'Hospital Elevator Scheme',
        description: 'Meets the specific needs of medical facilities, with larger car sizes for beds and medical equipment, and smooth, reliable operation.',
        image: 'https://xinfuji.com/wp-content/uploads/2024/05/FJ-K003.jpg'
    },
    observation: {
        title: 'Observation Elevator Scheme',
        description: 'Offers panoramic views for passengers, perfect for tourist attractions and landmark buildings. Features a glass car and shaft.',
        image: 'https://xinfuji.com/wp-content/uploads/2024/05/FJ-K021.jpg'
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // --- Get User Inputs ---
    const usage = document.getElementById('usage').value;
    const shaftWidth = parseFloat(document.getElementById('shaft-width').value);
    const shaftDepth = parseFloat(document.getElementById('shaft-depth').value);
    const shaftHeight = parseFloat(document.getElementById('shaft-height').value);
    const frameRequired = document.getElementById('frame-required').value;
    const doorType = document.getElementById('door-type').value;
    const counterweightPos = document.getElementById('counterweight-pos').value;

    // --- Calculations ---
    let doorOpeningWidth = 0;
    let carWidth = 0;
    let carDepth = 0;

    // 1. Calculate Door Opening Width
    switch (doorType) {
        case 'center':
            doorOpeningWidth = (shaftWidth - 100) / 2;
            break;
        case 'side':
            doorOpeningWidth = (shaftWidth - 230) / 1.5;
            break;
        case '4co':
            // This rule has a dependency on the result, we'll assume a placeholder logic for now.
            // A simple interpretation is to check a hypothetical opening width first.
            // Let's use a simplified rule for now: if shaft is wide, assume opening is > 800.
            if (shaftWidth > 2100) { // Example threshold
                doorOpeningWidth = shaftWidth - 550;
            } else {
                doorOpeningWidth = shaftWidth - 500;
            }
            break;
    }

    // 2. Calculate Car Dimensions
    if (counterweightPos === 'side') {
        carWidth = shaftWidth - 600;
        carDepth = shaftDepth - 300;
    } else { // Rear position
        if (doorType === 'center') {
            carWidth = shaftWidth - 400;
            carDepth = shaftDepth - 450;
        } else { // Side or 4CO
            carWidth = shaftWidth - 400;
            carDepth = shaftDepth - 500;
        }
    }

    // --- Update Display ---
    const resultsDiv = document.getElementById('results');
    const selectedScheme = schemes[usage];
    if (selectedScheme) {
        schemeTitle.textContent = selectedScheme.title;
        schemeImage.src = selectedScheme.image;
        schemeDescription.textContent = selectedScheme.description;
    }

    doorWidthResult.textContent = doorOpeningWidth.toFixed(0);
    carSizeResult.textContent = `${carWidth.toFixed(0)} x ${carDepth.toFixed(0)}`;

    // --- Glass & Frame Calculation ---
    const glassCostSection = document.getElementById('glass-cost-section');
    if (frameRequired === 'yes') {
        const widthM = shaftWidth / 1000;
        const depthM = shaftDepth / 1000;
        const hPlus1 = shaftHeight + 1;

        const glassArea = (1.5 * widthM + 2 * depthM) * hPlus1;
        const glassCost = glassArea * 250;
        const frameCost = 1800 * hPlus1;
        const totalCost = glassCost + frameCost;

        const fmt = n => '¥' + Math.round(n).toLocaleString('zh-CN');

        document.getElementById('glass-area-result').textContent = glassArea.toFixed(2) + ' m²';
        document.getElementById('glass-cost-result').textContent = fmt(glassCost);
        document.getElementById('frame-cost-result').textContent = fmt(frameCost);
        document.getElementById('total-glass-result').textContent = fmt(totalCost);
        glassCostSection.style.display = 'block';
    } else {
        glassCostSection.style.display = 'none';
    }

    resultsDiv.classList.add('visible');
});

function updateSpeedOptions() {
    const load = parseInt(loadInput.value, 10);
    const lowLoadSpeedOptions = document.querySelectorAll('.low-load-speed');

    if (load <= 630) {
        lowLoadSpeedOptions.forEach(option => option.style.display = 'block');
    } else {
        lowLoadSpeedOptions.forEach(option => option.style.display = 'none');
        // If a low-load speed was selected, reset to a default
        const speedSelect = document.getElementById('speed');
        if (speedSelect.options[speedSelect.selectedIndex].classList.contains('low-load-speed')) {
            speedSelect.value = '1.0';
        }
    }
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', updateSpeedOptions);
// Update when the load value changes
loadInput.addEventListener('input', updateSpeedOptions);
