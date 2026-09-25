@php
    $TRUE = true;
@endphp

<div @class(['d-flex','flex-column','div-userForm_eqForm']) @style([])>
    <div @class(['d-flex','flex-row']) @style([])>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-latitude">Latitude</label>
                <small @class(['list-inline-item']) id="in_small-latitude">
                    <p @class(['m-0'])>
                        <span @class(['list-inline-item'])>(+ve for N</span>
                        <span @class(['list-inline-item'])>-ve for S)</span>
                    </p>
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-latitude" @disabled([$TRUE]) />
            </div>
        </div>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-longitude">Longitude</label>
                <small @class(['list-inline-item']) id="in_small-longitude">
                    <p @class(['m-0'])>
                        <span @class(['list-inline-item'])>(+ve for E</span>
                        <span @class(['list-inline-item'])>-ve for N)</span>
                    </p>
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-longitude" @disabled([$TRUE]) />
            </div>
        </div>
    </div>
    <div @class(['d-flex','flex-row']) @style([])>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-origindate">Origin Date (UTC)</label>
                <small @class(['list-inline-item']) id="in_small-origindate">
                    (yyyymmdd)
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-origindate" @disabled([$TRUE]) />
            </div>
        </div>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-origintime">Origin Time (UTC)</label>
                <small @class(['list-inline-item']) id="in_small-origintime">
                    (hhmmss)
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-origintime" @disabled([$TRUE]) />
            </div>
        </div>
    </div>
    <div @class(['d-flex','flex-row']) @style([])>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-depth">Depth</label>
                <small @class(['list-inline-item']) id="in_small-depth">
                    (nearest integer)
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-depth" @disabled([$TRUE]) />
            </div>
        </div>
        <div @class(['d-flex','flex-column','w-50','m-1']) @style([])>
            <div @class(['d-flex'])>
                <label @class(['list-inline-item','fw-bold']) for="in-magnitude">Magnitude</label>
                <small @class(['list-inline-item']) id="in_small-magnitude">
                (1 decimal place)
                </small>
            </div>
            <div>
                <input @class(['form-control']) id="in-magnitude" @disabled([$TRUE]) />
            </div>
        </div>
    </div>
</div>