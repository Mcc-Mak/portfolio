@php
    $TRUE = true;
@endphp

<script>
    $(document).ready(
        () => {
            var e_userForm_editButton = $('#in-IsLocallyFelt');
            
            e_userForm_editButton
                .on(
                    'change',
                    (e) => {
                        let is_checked = e.target.checked;
                        $('.div-userForm_eqForm>div>div>div>input')
                            .prop('disabled',!e.target.checked);
                    }
                );
        }
    );
</script>

<div @class([
    // 'alert',
    // 'alert-dark',
    'p-0',
    'm-1',
    ]) @style([])>
    <div @class(['d-flex','justify-content-center']) @style([])>
        <div @class([
            'd-flex',
            'flex-row',
            'justify-content-center',
            'alert',
            'alert-warning',
            'rounded-pill',
            'm-0',
            'p-0',
            'w-50'
            ]) @style([])>
            <div @class([]) @style([])>
                <span @style(['font-size:24px'])>
                    🆘<input id="in-IsLocallyFelt"
                            @class(['w-100'])
                            type="checkbox"
                            data-toggle="switchbutton"
                            data-size="sm"
                            data-width="150"
                            data-onlabel="Editable"
                            data-offlabel="Non-Editable"
                            data-onstyle="success"
                            data-offstyle="secondary"/>
                </span>
            </div>
        </div>
    </div>
</div>