<!-- <div @class([]) @style([])></div> -->
 <script>
    const INTENSITY_LIST = ['II','III','IV','V','VI','VII','VIII','IX','X'];

    var convertRangeToSingleIntensity = (e_intensity1, e_intensity2) => {
        e_intensity1[0].nextElementSibling.value = INTENSITY_LIST[e_intensity1[0].value-2];
        if(e_intensity1[0].value > e_intensity2[0].value) {
            e_intensity2[0].value = e_intensity1[0].value;
        }
        if(e_intensity1[0].value < e_intensity2[0].value) {
            e_intensity2[0].value = e_intensity1[0].value;
        }
    };
    window.resetIntensity = (e_intensity1, e_intensity2) => {
        e_intensity1[0].value = 2;
        e_intensity2[0].value = 2;
        e_intensity1.trigger('input');
    };
    $(document).ready(
        () => {
            var e_intensity1 = $('#in-lfForm_LFS3_intensity1');
            var e_intensity2 = $('#in-lfForm_LFS3_intensity2');

            e_intensity1.on(
                'input', 
                () => {
                    console.log('triggered')
                    convertRangeToSingleIntensity(
                        e_intensity1,
                        e_intensity2
                    );
                }
            )
        }
    );
 </script>
<div @class([
    'd-flex',
    'flex-column',
    'w-75',
    'div-userForm_LFS3_lfForm_intensity',
    ]) @style([])>
    <div @class([
        'd-flex',
        'flex-row',
        'm-1',
        ])>
        <label for="in-lfForm_LFS3_intensity1" @class([
                'col-form-label',
                'fw-bold',
                'alert',
                'alert-secondary',
                'm-0',
                'text-dark',
                'text-center',
                'rounded',
                'p-1',
            ]) @style([
                'width:150px',
                'display:none',
                ])>
            Intensity (start)
        </label>
        <input id="in-lfForm_LFS3_intensity1" type="range" @class([
            'p-2',
            ]) @style([
                'width:200px',
                'display:none',
            ]) min="2" max="9" value="2" step="1" />
        <output id="out-lfForm_intensity1" @class([
            'm-auto',
            'text-danger',
            'fw-bold',
            ]) @style([
                'font-size:20px',
                'display:none',
                ])>
            II
        </output>
    </div>
    <div @class([
        'd-flex',
        'flex-row',
        'm-1',
        ])>
        <label for="in-lfForm_LFS3_intensity2" @class([
                'col-form-label',
                'fw-bold',
                'alert',
                'alert-secondary',
                'm-0',
                'text-dark',
                'text-light',
                'text-center',
                'rounded',
                'p-1',
            ]) @style([
                'width:150px',
                'display:none',
                ])>
            Intensity (end)
        </label>
        <input id="in-lfForm_LFS3_intensity2" type="range" @class([
            'p-2',
            ]) @style([
                'width:200px',
                'display:none',
            ]) min="2" max="9" value="2" step="1"
            disabled />
        <output id="out-lfForm_intensity2" @class([
            'm-auto',
            'text-danger',
            'fw-bold',
            ]) @style([
                'font-size:20px',
                'display:none',
                ]) hidden>
            II
        </output>
    </div>
</div>