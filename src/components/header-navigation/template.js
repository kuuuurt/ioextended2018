import { html } from '@littleq/element-lite';

const template = (self) => html`
  <nav class="header-navigation">
    <ul class="navigation-list">
      ${self.navigation.map(i => html`
        <li class="navigation-item">
          <a href="${i.href}" class="navigation-anchor">
            ${i.label}
          </a>
        </li>
      `)}
    </ul>
  </nav>
`;

export { template };
