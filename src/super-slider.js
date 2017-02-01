
module.exports = React.createClass({

    getInitialState() {
        this._handled = false;
        this._handlers = null;

        return {};
    },

    componentWillUnmount() {
        if (this._handlers) {
            document.body.removeEventListener('mousemove', this._handlers.move);
            document.body.removeEventListener('mouseup', this._handlers.up);
            this._handlers = null;
        }
    },

    render() {
        const { value, min, max } = this.props;

        return (
            <div className="super-slider" ref={this._onRootRef} onMouseDown={e => this._onMouseDown(e)}>
                <div className="slider">
                    <div className="handle" style={{
                        left: `${100 * (value - min) / (max - min)}%`
                    }} />
                </div>
            </div>
        );
    },

    _onRootRef(el) {
        if (el) {
            const box = el.getBoundingClientRect();

            this._bound = {
                left:  Math.round(box.left),
                width: Math.round(box.width),
            };
        }
    },

    _handleEvents() {
        this._handled = true;

        if (!this._handlers) {
            this._handlers = {
                move: e  => { if (this._handled) this._move(e); },
                up:   () => this._onMouseUp(),
            };

            document.addEventListener('mousemove', this._handlers.move);
            document.addEventListener('mouseup', this._handlers.up);
        }
    },

    _move(e) {
        if (!this.props.onChange) {
            return;
        }

        const { min, max, value } = this.props;

        const x        = Math.max(e.pageX, this._bound.left);
        const offset   = Math.min(this._bound.width, x - this._bound.left);
        const newValue = min + Math.round((max - min) * (offset / this._bound.width));

        if (newValue !== value) {
            if (this.props.onChange) {
                this.props.onChange(newValue)
            }
        }
    },

    _onMouseDown(e) {
        e.preventDefault();

        this._handleEvents();
        this._move(e);
    },

    _onMouseUp() {
        if (!this._handled) {
            return;
        }

        this._handled = false;
    },

});
