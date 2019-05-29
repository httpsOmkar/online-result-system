import {css, customElement, html, LitElement} from 'lit-element';

const PREFIX = `f4erp`;

@customElement(`${ PREFIX }-app-layout`)
export class AppLayout extends LitElement {
    constructor() {
        super();
    }

    // language=CSS
    static styles = css`
    `;

    static handleMenuChange(url: string) {
        return () => {
            const a = document.createElement('a');
            a.href = url;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        };
    }

    // Render element DOM by returning a `lit-html` template.
    render() {
        // language=HTML
        return html`
            <custom-style>
                <style include="lumo-typography lumo-color">
                </style>
            </custom-style>
            <vaadin-app-layout>
                <img slot="branding" referrerpolicy="no-referrer" src="https://i.imgur.com/GPpnszs.png" alt="Logo" width="100" height="31">

                <vaadin-tabs slot="menu">
                    <vaadin-tab theme="icon-on-top" @click="${AppLayout.handleMenuChange('/')}">
                        <iron-icon icon="vaadin:home"></iron-icon>
                        Home
                    </vaadin-tab>
                    <vaadin-tab theme="icon-on-top">
                        <iron-icon icon="vaadin:list-select"></iron-icon>
                        Notice board
                    </vaadin-tab>
                </vaadin-tabs>

                <div class="content">
                    <slot></slot>
                </div>
            </vaadin-app-layout>
        `;
    }

}
