import {LitElement, html, css, customElement, property} from 'lit-element';

@customElement('f4erp-toolbar')
export class MyElement extends LitElement {
    constructor() {
        super();
    }

    // language=CSS
    static styles = css`
        :host {
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
        }

        nav {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 8px 16px;
            height: 56px;
        }
    `;

    // Render element DOM by returning a `lit-html` template.
    render() {
        // language=HTML
        return html`
            <nav>
                <slot></slot>
            </nav>
        `;
    }

}
