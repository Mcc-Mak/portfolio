@section('<body>.topbar')
    <button @class([
        'btn',
        'btn-info',
        'border',
        'border-secondary',
        'w-100',
        'rounded-pill',
        ]) @style([
            'height: 12%;'
            ])>
        <div @class([
            'd-flex',
            'flex-row',
            'justify-content-center',
            'alert',
            'alert-primary',
            'border',
            'border-secondary',
            'm-auto',
            'rounded-pill',
            'w-75',
            ])>
            <img @style(['width:3%;height:3%']) src="{{ $IMG_ICON }}" />
            <div @class([
                'd-flex',
                'flex-row',
                'm-2',
                ])>
                <div @class(['text-dark'])>C</div>
                <div @class(['text-info'])>omputer</div>
            </div>
            <div @class([
                'd-flex',
                'flex-row',
                'm-2',
                ])>
                <div @class(['text-dark'])>A</div>
                <div @class(['text-info'])>ided</div>
            </div>
            <div @class([
                'd-flex',
                'flex-row',
                'm-2',
                ])>
                <div @class(['text-dark'])>S</div>
                <div @class(['text-info'])>eismic</div>
            </div>
            <div @class([
                'd-flex',
                'flex-row',
                'm-2',
                ])>
                <div @class(['text-dark'])>I</div>
                <div @class(['text-info'])>nformation</div>
            </div>
            <div @class([
                'd-flex',
                'flex-row',
                'm-2',
                ])>
                <div @class(['text-dark'])>S</div>
                <div @class(['text-info'])>ystem</div>
            </div>
        </div>
    </button>
@endsection