<!-- <p>&lt;USERFORM.EQPARAM&gt;</p> -->

@php
    $TRUE = true;
@endphp

<div @class([
    'd-flex',
    'flex-column',
    'bg-secondary',
    'p-2',
    'h-100',
    ]) @style([])>
    <div @class([
        'fw-bold',
        'text-decoration-underline',
        'text-danger',
        'text-center',
        'alert',
        'alert-info',
        'm-0',
        'p-1',
        ]) @style(['font-size:16px'])>
        Earthquake Parameters
    </div>
    <div @class([
        'd-flex',
        'flex-column',
        'bg-light',
        'h-100',
        ]) @style([])>
        @include('casis.component.userForm_eqParam_eqForm')
        @include('casis.component.userForm_eqParam_editButton')
        @include('casis.component.userForm_eqParam_lfFormFlag')
        @include('casis.component.userForm_eqParam_lfForm_')
    </div>
    <div @class([]) @style([])></div>
</div>