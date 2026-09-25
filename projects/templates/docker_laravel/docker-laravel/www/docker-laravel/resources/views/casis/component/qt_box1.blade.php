<!-- <p>&lt;QT.BOX1&gt;</p> -->

@php
    $IMG_HINT = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
@endphp

<div @class([
    'd-flex',
    'flex-column',
    'm-3',
    ])>
    <div @class([
        'd-flex',
        'flex-row',
        ])>
        <div @class([
            'd-flex',
            'text-danger',
            'fw-bold',
            'text-decoration-underline',
            ]) @style([
                'font-size:20px',
                'font-family:roboto',
                ])>
            Hint
        </div>
        <div @class([
            'd-flex',
            'm-auto',
            'justify-content-end',
            ])>
            <img src="{{ $IMG_HINT }}" @style(['width:70%;height:70%']) />
        </div>
    </div>
    <div>
        <div @class([
            'border',
            'border-secondary',
            'mt-3',
            'p-2',
            'text-center',
            'rounded-pill',
            ])>
            <span @class([
                'list-inline-item'
                ])>
                <i @class(['fa-solid','fa-book'])></i>
            </span>
            <span @class([
                'list-inline-item'
                ])>
                User Guide
            </span>
        </div>
    </div>
</div>