<!-- <p>&lt;QT.BOX3&gt;</p> -->

@php
    $TRUE = true;
@endphp

<div @class([
    'd-flex',
    'flex-column',
    'm-3',
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
        Quick Tools
    </div>
    <!-- TODO: Start -->
    <div @class([
        'd-flex',
        'flex-column',
        'justify-content-center',
        'm-2',
        ]) @style([])>
        <div @class([
            'd-flex',
            'flex-row',
            'mb-2',
            ]) @style([])>
            <div @class(['list-inline-item']) @style([])>
                <button @class([
                        'btn',
                        'btn-outline-secondary',
                        ]) @style(['font-size:24px'])>
                    🌎
                </button>
            </div>
            <div @class(['list-inline-item']) @style([])>
                <button @class([
                        'btn',
                        'btn-outline-secondary',
                        ]) @style(['font-size:24px'])>
                    🌊
                </button>
            </div>
        </div>
        <div @class([
            'd-flex',
            'flex-row',
            ]) @style([])>
            <div @class(['list-inline-item']) @style([])>
                <button @class([
                        'btn',
                        'btn-outline-secondary',
                        ]) @style(['font-size:24px'])>
                    📜
                </button>
            </div>
            <div @class(['list-inline-item']) @style([])>
                <button @class([
                        'btn',
                        'btn-outline-secondary',
                        ]) @style(['font-size:24px'])>
                    🔗
                </button>
            </div>
        </div>
    </div>
    <!-- TODO: End -->
    <div @class([
        'd-flex',
        'flex-column',
        'justify-content-center',
        ]) @style([])>
        <div @class([
            'd-flex',
            'flex-column',
            'justify-content-center',
            'm-2',
            ]) @style([])>
            <button @class([
                'btn',
                'btn-secondary',
                'border',
                'border-dark',
                'm-auto',
                ]) @disabled($TRUE)>
                <span>
                    <i @class([
                        'fa-regular',
                        'fa-pen-to-square'
                        ])></i>
                </span>
                <br/>
                <span>
                    QEM format
                </span>
            </button>
        </div>
        <div @class([
            'd-flex',
            'flex-column',
            'justify-content-center',
            'm-2',
            ]) @style([])>
            <button @class([
                'btn',
                'btn-secondary',
                'border',
                'border-dark',
                'm-auto',
                ]) @disabled($TRUE)>
                <span>
                    <i @class([
                        'fa-regular',
                        'fa-pen-to-square'
                        ])></i>
                </span>
                <br/>
                <span>
                    Press format
                </span>
            </button>
        </div>
    </div>
    <div @class([
        'd-flex',
        'flex-column',
        'justify-content-center',
        'm-2',
        ]) @style([])>
        <button @class([
            'btn',
            'btn-secondary',
            ]) hidden="{{ $TRUE }}">
            Production
        </button>
    </div>
</div>