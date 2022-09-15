function rangeSlider(wrapper) {
    let stepsSlider = wrapper.querySelectorAll('.no-ui-slider__ranges')[0],
        currentValue = wrapper.querySelectorAll('.no-ui-slider__value')[0],
        minValue = wrapper.getAttribute('data-min'),
        maxValue = wrapper.getAttribute('data-max'),
        startValue = [wrapper.getAttribute('data-from'),wrapper.getAttribute('data-to')],
        hiddenInput = wrapper.querySelectorAll('.no-ui-slider__input')[0];

    noUiSlider.create(stepsSlider, {
        start: startValue,
        step: 1,
        connect: true,
        keyboardDefaultStep: 1,
        range: {
            'min': Number(minValue),
            'max': Number(maxValue)
        },
    });

    stepsSlider.noUiSlider.on('update', function (values, handle) {
        currentValue.innerHTML = `${values[1].split('.')[0]}%`;
        hiddenInput.setAttribute('value', values[1].split('.')[0]);
    });

    return stepsSlider;
}

function customSelect(wrapper) {
    let selectHead = wrapper.querySelectorAll('.custom-select__head')[0],
        selectBody = wrapper.querySelectorAll('.custom-select__body')[0],
        selectRadio = wrapper.querySelectorAll('input');

    selectHead.addEventListener('click', function () {
        if(selectHead.classList.contains('active')) {
            selectHead.classList.remove('active');
            selectBody.classList.remove('active');
        } else {
            selectHead.classList.add('active');
            selectBody.classList.add('active');
        }
    });

    selectRadio.forEach(radio => {
        radio.addEventListener('change', function () {
            selectHead.innerHTML = this.getAttribute('data-name')
            selectHead.classList.remove('active');
            selectBody.classList.remove('active');
        })
    });

    document.addEventListener('click', function (ev) {
        if(ev.target.classList.contains('custom-select__head')) return;
        selectHead.classList.remove('active');
        selectBody.classList.remove('active');
    })
}

function customFile(wrapper) {
    let fileInput = wrapper.querySelectorAll('input')[0],
        fileName = wrapper.querySelectorAll('.custom-file__name')[0];

    fileInput.addEventListener('change', function () {
        fileName.innerHTML = this.files[0].name;
    })
}

window.addEventListener('load', function () {
    document.querySelectorAll('.js-no-ui-slider').forEach(slider => {
        rangeSlider(slider);
    });
    document.querySelectorAll('.js-custom-select').forEach(select => {
        customSelect(select);
    });
    document.querySelectorAll('.js-custom-file').forEach(file => {
        customFile(file);
    });
});
