import React, { Component } from 'react';

class Signature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInput: null,
            buttons: {
                sign: false,
                clear: false,
                revoke: false
            }
        };
    }
    bindSignature(e) {
        if (this.state.signInput.isEmpty()) return false;
        let image = this.state.signInput.toDataURL(),
            container = document.getElementById(this.props.targetEl),
            img = document.createElement("img"),
            onClick = (e) => {
                debugger;
                container.removeChild(e.target);
            };

        img.src = image;
        img.alt = "Double Click to Remove Signature";
        container.children.length ? container.removeChild(container.children[0]) : null;
        container.appendChild(img);
        debugger;
        img.removeEventListener("dblclick", onClick);
        img.addEventListener("dblclick", onClick);
        this.setState({ buttons: { revoke: true, clear: true, sign: true } });
    }

    resizeCanvas(e) {
        let canvas = React.FindDOMNode(this.refs.signingSurface),
            ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);

    }
    clearSignature(e) {
        debugger;
        this.state.signInput.clear();
        this.setState({ buttons: { sign: true, clear: true, revoke: false } });
    }
    componentWillUnmount() {
        window.addEventListener("resize", this.resizeCanvas);
    }

    componentDidMount() {
        let canvas = document.getElementById(this.props.srcElement),
            widget = new SignaturePad(canvas, {
                minWidth: .2,
                maxWidth: 3,
                onBegin(e) {
                    this.setState({ buttons: { sign: true, clear: true, revoke: false } });
                },
                onEnd(e) {

                },
            });
        this.setState({ signInput: widget });
        window.addEventListener("resize", this.resizeCanvas);
        debugger;
    }
    render() {
        return <div className='container signature-container'>
            <div class='row'>
                <div class='col-md-12'>
                    <h1> {this.props.title}</h1>
                </div>
                <div class='col-md-12'>
                    <canvas ref='signingSurface' className='signature-input' id={this.props.srcElement}></canvas>
                </div>
            </div>
            <div class='row' ref="btnWrapper" >
                <div class='col-sm-6'>
                    <div ref="btnSign" className='btn btn-success pull-left' onClick={this.bindSignature.bind(this)}>Sign</div> &nbsp;
                     <div ref="btnClear" className='btn btn-warning pull-right' onClick={this.clearSignature.bind(this)}>Clear</div>
                </div>
            </div>
        </div>
            ;
    }
}

React.render(<Application srcElement="signature-input" targetEl="sign-location" title="Example Signature Widget" />,
    document.getElementById('sign-widget'));

export default Signature;