import { ElementLiteLit, html } from '@littleq/element-lite';
import { subscribe, unsubscribe } from '../../utils/ui-state.js';
import { template } from './template.js';
import style from './style.styl';
import '../../components/banner-section/index.js';
import '../../components/general-section/index.js';
import '../../components/footer-section/index.js';
import '../../components/section-location/index.js';
const { HTMLElement, customElements, fetch } = window;

class Page extends ElementLiteLit(HTMLElement) {
  static get is () { return 'page-location'; }

  constructor () {
    super();
    this.__data = {
      data: {
        date: 'Loading...',
        location: 'Loading...'
      }
    };
    this.__boundFetchPageData = this.fetchPageData.bind(this);
  }

  connectedCallback () {
    super.connectedCallback();
    subscribe('routeParamObject', this.__boundFetchPageData);
  }
  
  disconnectedCallback () {
    unsubscribe('routeParamObject', this.__boundFetchPageData);
  }

  async fetchPageData ({ id }) {
    const location = window.location.hostname === 'localhost' ? '' : 'https://raw.githubusercontent.com/gdgphilippines/ioextended2018/master';
    this.data = await fetch(`${location}/data/locations/${id}.json`).then(result => result.json());
  }

  set data (data) {
    this.__data['data'] = data;
    this.invalidate();
  }

  get data () {
    return this.__data['data'];
  }

  render () {
    return html`<style>${style.toString()}</style>${template(this)}`;
  }
}

if (!customElements.get(Page.is)) {
  customElements.define(Page.is, Page);
} else {
  console.warn(`${Page.is} is already defined somewhere. Please check your code.`);
}
