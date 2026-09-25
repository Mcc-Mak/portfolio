<script>
    var setLayoutLfFormInput = (e_lfs3_lfFormIn) => {
        e_lfs3_lfFormIn
            .on(
                'input',
                (e) => {
                    $(e.target)
                        .removeClass('no_user_interaction');
                }
            )
    };

    window.resetLfFormInput = (e_lfs3_lfFormIn) => {
        $('.div-userForm_LFS3_lfForm>div>select').toArray()
            .forEach(e => {
                e.children[0].selected = true;
                $(e).removeClass('no_user_interaction')
                    .addClass('no_user_interaction');
            })
    };

    $(document).ready(
        () => {
            var e_lfs3_lfFormIn = $('.div-userForm_LFS3_lfForm>div>select');

            setLayoutLfFormInput(e_lfs3_lfFormIn);
        }
    );
</script>

<style>
    .no_user_interaction {
        background-color: #ffffcc!important
    }
</style>

<div @class([
    'd-flex',
    'flex-column',
    'align-items-center',
    'div-userForm_LFS3_lfForm',
    ])>
    <div @class([
        'd-flex',
        'flex-row',
        'm-1',
        'w-75',
        ])>
        <label for="in-lfForm_LFS3_report" @class([
                'col-form-label',
                'fw-bold',
                'bg-secondary',
                'text-light',
                'text-center',
                'rounded',
                'p-1',
            ]) @style([
                'min-width:150px',
                'display:none',
                ])>
            No. of Report
        </label>
        <select id="in-lfForm_LFS3_report" @class([
                'form-select',
                'no_user_interaction'
            ]) @style(['display:none'])>
            <option value="-1" hidden>--- Select ---</option>
            <option value="1">two</option>
            <option value="2">serveral</option>
            <option value="3">ten</option>
            <option value="4">over hundred</option>
            <option value="5">over thousand</option>
        </select>
    </div>
    <div @class([
        'd-flex',
        'flex-row',
        'm-1',
        'w-75',
        ])>
        <label for="in-lfForm_LFS3_shaking" @class([
                'col-form-label',
                'fw-bold',
                'bg-secondary',
                'text-light',
                'text-center',
                'rounded',
                'p-1',
            ]) @style([
                'min-width:150px',
                'display:none',
                ])>
            Shaking
        </label>
        <select id="in-lfForm_LFS3_shaking" @class([
                'form-select',
                'no_user_interaction'
            ]) @style(['display:none'])>
            <option value="-1" hidden>--- Select ---</option>
            <option value="1">this earth tremor</option>
            <option value="2">minor shaking</option>
        </select>
    </div>
    <div @class([
        'd-flex',
        'flex-row',
        'm-1',
        'w-75',
        ])>
        <label for="in-lfForm_LFS3_duration" @class([
                'col-form-label',
                'fw-bold',
                'bg-secondary',
                'text-light',
                'text-center',
                'rounded',
                'p-1',
            ]) @style([
                'min-width:150px',
                'display:none',
                ])>
            Duration
        </label>
        <select id="in-lfForm_LFS3_duration" @class([
                'form-select',
                'no_user_interaction'
            ]) @style(['display:none'])>
            <option value="-1" hidden>--- Select ---</option>
            <option value="1">???</option>
            <option value="2">a few seconds</option>
        </select>
    </div>
    @include('casis.component.userForm_eqParam_lfForm_intensity')
</div>