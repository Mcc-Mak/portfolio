@extends('casis.layout.layout_1')
 
@use('Illuminate\Support\Facades\Vite')

@php
    $HIDDEN = false;
    $IMG_ICON = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
@endphp

@section('<head>.title.appName', 'CASIS')
@section('<head>.title.pageName', 'Home')
 
@section('<head>.include')
    <style>
        {!! Vite::content('resources/css/app.css') !!}
    </style>
    <style>
        {!! Vite::content('resources/sass/app.scss') !!}
    </style>
    <script>
        {!! Vite::content('resources/js/app.js') !!}
    </script>
    <style>
        .noselect {
            -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                        user-select: none; /* Non-prefixed version, currently
                                            supported by Chrome, Edge, Opera and Firefox */
        }
    </style>
@endsection

@include('casis.topbar')
@section('<body>.content')
    <div @class([
        'd-flex',
        'flex-row',
        'noselect',
        ]) @style([
            'width:100%',
            'height:100%',
            ])>
        <div @class([
            'd-flex',
            'flex-column',
            'border',
            'border-secondary',
            'bg-secondary',
            'rounded',
            'm-1',
            ]) @style([
                'width:10%',
                ])>
            <!-- Quick Tools -->
            <div @class([
                'border',
                'border-secondary',
                'rounded',
                'bg-light',
                'm-2',
                ]) @style([
                'height:22%',
                ])>
                @include('casis.component.qt_box1')
            </div>
            <div @class([
                'border',
                'border-secondary',
                'rounded',
                'bg-light',
                'm-2',
                ]) @style([
                'height:23%',
                ])>
                @include('casis.component.qt_box2')
            </div>
            <div @class([
                'border',
                'border-secondary',
                'rounded',
                'bg-light',
                'm-2',
                ]) @style([
                'height:55%',
                ])>
                @include('casis.component.qt_box3')
            </div>
        </div>
        <div @class([
            'd-flex',
            'flex-column',
            ]) @style([
                'width:65%',
                ])>
            <!-- UserForm -->
            <div @class([
                'border',
                'border-secondary',
                'rounded',
                'bg-light',
                'm-1',
                ]) @style([
                'height:25%',
                ])>
                @include('casis.component.userForm_db')
            </div>
            <div @class([
                'd-flex',
                'flex-row',
                ]) @style([
                'height:75%',
                ])>
                <div @class([
                    'border',
                    'border-secondary',
                    'rounded',
                    'bg-light',
                    'm-1',
                    ]) @style([
                    'width:50%',
                    ])>
                    @include('casis.component.userForm_eqParam_')
                </div>
                <div @class([
                    'border',
                    'border-secondary',
                    'rounded',
                    'bg-light',
                    'm-1',
                    ]) @style([
                    'width:50%',
                    ])>
                    @include('casis.component.userForm_eqLoc')
                </div>
            </div>
        </div>
        <div @class([
            'border',
            'border-secondary',
            'rounded',
            'bg-light',
            'm-1',
            ]) @style([
                'width:25%'
                ])>
            @include('casis.component.map')
        </div>
    </div>
@endsection