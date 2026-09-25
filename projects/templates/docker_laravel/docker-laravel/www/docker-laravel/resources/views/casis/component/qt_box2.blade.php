<!-- <p>&lt;QT.BOX2&gt;</p> -->
<div @class([
    'd-flex',
    'flex-column',
    'justify-content-center',
    ]) @style([])>
    <div @class([
        'd-flex',
        'flex-row',
        'justify-content-center',
        'border',
        'border-secondary',
        'rounded-pill',
        'm-2',
        ]) @style([])>
        <span @class(['list-inline-item'])>
            <i @class([
                'fa-regular',
                'fa-calendar',
                ])></i>
        </span>
        <span @class([
            'text-center',
            'list-inline-item',
            ])>
            &lt;STAGE&gt;
        </span>
    </div>
    <div @class([
        'd-flex',
        'flex-column',
        'justify-content-center',
        ])>
        <button @class([
            'btn',
            'btn-success',
            'border',
            'border-secondary',
            'rounded-pill',
            'm-auto',
            'mt-3',
            'w-75',
            ]) @style([
                'font-size:12px',
                ])>
                <span @class(['list-inline-item'])>
                    <i @class([
                        'fa-solid',
                        'fa-arrows-rotate',
                        ])></i>
                </span>
                <span @class([
                    'text-center',
                    'list-inline-item',
                    ])>
                    Refresh page
                </span>
        </button>
    </div>
    <div @class([
        'd-flex',
        'flex-column',
        'justify-content-center',
        'mt-2',
        ])>
        <button @class([
            'btn',
            'btn-info',
            'border',
            'border-secondary',
            'rounded',
            'm-auto',
            'w-75'
            ]) @style([
                'font-size:24px',
                ])>
            Generate
        </button>
    </div>
</div>