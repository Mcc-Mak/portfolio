<script>
    $(document).ready(
        () => {
            // Component(s)
            let e_lfs2 = $('#in-lfForm_LFS2');
            let e_lfs3 = $('#in-lfForm_LFS3');

            // Handler(s)
            e_lfs2
                .on(
                    'input',
                    (e) => {
                        if(e.target.checked) {
                            $('.div-userForm_LFS>div:nth(1)>*').hide();
                        } else {
                            $('.div-userForm_LFS>div:nth(1)>*').show();
                        }
                    }
                );
            e_lfs3
                .on(
                    'input',
                    (e) => {
                        if(e.target.checked) {
                            $('.div-userForm_LFS>div:nth(0)>*').hide();
                        } else {
                            $('.div-userForm_LFS>div:nth(0)>*').show();
                            window.resetIntensity(
                                $('#in-lfForm_LFS3_intensity1'),
                                $('#in-lfForm_LFS3_intensity2')
                            );
                            window.resetLfFormInput(
                                $('.div-userForm_LFS3_lfForm>div>select')
                            );
                        }

                        let display = e.target.checked ? '' : 'none';

                        let selector_lfForm =
                            ['label', 'select',]
                                .map(type=> {return `.div-userForm_LFS3_lfForm>div>${type}`})
                                .join(',');
                        $(selector_lfForm).css({'display': display});

                        let selector_lfForm_intensity =
                            ['label','input','output:nth(0)']
                                .map(type=> {return `.div-userForm_LFS3_lfForm_intensity>div>${type}`})
                                .join(',');
                        $(selector_lfForm_intensity).css({'display': display});
                    }
                );
        }
    );
</script>
<div @class([
    'd-flex',
    'flex-column',
    'align-items-center',
    'rounded-pill',
    'm-auto',
    'w-75',
    'div-userForm_LFS',
    ]) @style([
        'border:groove',
        'margin-top:0px!important',
        ])>
    <div @class([])>
        <input id="in-lfForm_LFS2" @class([
            'form-check-input',
            'border',
            'border-secondary',
            ]) type="checkbox" />
        <label for="in-lfForm_LFS2" @class([
            'form-check-label',
            'fw-bold',
            ])>Locally felt step 2 (no felt detail)</label>
    </div>
    <div @class([])>
        <input id="in-lfForm_LFS3" @class([
            'form-check-input',
            'border',
            'border-secondary',
            ]) type="checkbox" />
        <label for="in-lfForm_LFS3" @class([
            'form-check-label',
            'fw-bold',
            ])>Locally felt step 3 (with felt detail)</label>
    </div>
</div>