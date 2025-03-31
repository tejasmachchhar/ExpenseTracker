import React from 'react'

export const UserSidebar = () => {
  return (
    <>
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        {/*begin::Sidebar Brand*/}
        <div className="sidebar-brand">
          {/*begin::Brand Link*/}
          <a href="./index.html" className="brand-link">
            {/*begin::Brand Image*/}
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="User Logo"
              className="brand-image opacity-75 shadow"
            />
            {/*end::Brand Image*/}
            {/*begin::Brand Text*/}
            <span className="brand-text fw-light">User</span>
            {/*end::Brand Text*/}
          </a>
          {/*end::Brand Link*/}
        </div>
        <div className='sidebar-wrapper' data-overlayscrollbars="host">
          <div className="os-size-observer">
            <div className="os-size-observer-listener" />
          </div>
          <div
            // className="" 
            data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
            tabIndex={-1}
            style={{
              marginRight: "-16px",
              marginBottom: "-16px",
              marginLeft: 0,
              top: "-8px",
              right: "auto",
              left: "-8px",
              width: "calc(100% + 16px)",
              padding: 8
            }}
          >
            <nav className="mt-2">
              {/*begin::Sidebar Menu*/}
              <ul
                className="nav sidebar-menu flex-column"
                data-lte-toggle="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item menu-open">
                  <a href="#" className="nav-link active">
                    <i className="nav-icon bi bi-speedometer" />
                    <p>
                      Dashboard
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./index.html" className="nav-link active">
                        <i className="nav-icon bi bi-circle" />
                        <p>Dashboard v1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./index2.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Dashboard v2</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./index3.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Dashboard v3</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="./generate/theme.html" className="nav-link">
                    <i className="nav-icon bi bi-palette" />
                    <p>Theme Generate</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-box-seam-fill" />
                    <p>
                      Widgets
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./widgets/small-box.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Small Box</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./widgets/info-box.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>info Box</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./widgets/cards.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Cards</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-clipboard-fill" />
                    <p>
                      Layout Options
                      <span className="nav-badge badge text-bg-secondary me-3">6</span>
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./layout/unfixed-sidebar.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Default Sidebar</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/fixed-sidebar.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Fixed Sidebar</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/layout-custom-area.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>
                          Layout <small>+ Custom Area </small>
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/sidebar-mini.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Sidebar Mini</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/collapsed-sidebar.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>
                          Sidebar Mini <small>+ Collapsed</small>
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/logo-switch.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>
                          Sidebar Mini <small>+ Logo Switch</small>
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./layout/layout-rtl.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Layout RTL</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-tree-fill" />
                    <p>
                      UI Elements
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./UI/general.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>General</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./UI/icons.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Icons</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./UI/timeline.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Timeline</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-pencil-square" />
                    <p>
                      Forms
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./forms/general.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>General Elements</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-table" />
                    <p>
                      Tables
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./tables/simple.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Simple Tables</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-header">EXAMPLES</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-box-arrow-in-right" />
                    <p>
                      Auth
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="nav-icon bi bi-box-arrow-in-right" />
                        <p>
                          Version 1
                          <i className="nav-arrow bi bi-chevron-right" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <a href="./examples/login.html" className="nav-link">
                            <i className="nav-icon bi bi-circle" />
                            <p>Login</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="./examples/register.html" className="nav-link">
                            <i className="nav-icon bi bi-circle" />
                            <p>Register</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="nav-icon bi bi-box-arrow-in-right" />
                        <p>
                          Version 2
                          <i className="nav-arrow bi bi-chevron-right" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <a href="./examples/login-v2.html" className="nav-link">
                            <i className="nav-icon bi bi-circle" />
                            <p>Login</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="./examples/register-v2.html" className="nav-link">
                            <i className="nav-icon bi bi-circle" />
                            <p>Register</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="./examples/lockscreen.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Lockscreen</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-header">DOCUMENTATIONS</li>
                <li className="nav-item">
                  <a href="./docs/introduction.html" className="nav-link">
                    <i className="nav-icon bi bi-download" />
                    <p>Installation</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./docs/layout.html" className="nav-link">
                    <i className="nav-icon bi bi-grip-horizontal" />
                    <p>Layout</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./docs/color-mode.html" className="nav-link">
                    <i className="nav-icon bi bi-star-half" />
                    <p>Color Mode</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-ui-checks-grid" />
                    <p>
                      Components
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./docs/components/main-header.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Main Header</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./docs/components/main-sidebar.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Main Sidebar</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-filetype-js" />
                    <p>
                      Javascript
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./docs/javascript/treeview.html" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Treeview</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="./docs/browser-support.html" className="nav-link">
                    <i className="nav-icon bi bi-browser-edge" />
                    <p>Browser Support</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./docs/how-to-contribute.html" className="nav-link">
                    <i className="nav-icon bi bi-hand-thumbs-up-fill" />
                    <p>How To Contribute</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./docs/faq.html" className="nav-link">
                    <i className="nav-icon bi bi-question-circle-fill" />
                    <p>FAQ</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./docs/license.html" className="nav-link">
                    <i className="nav-icon bi bi-patch-check-fill" />
                    <p>License</p>
                  </a>
                </li>
                <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle-fill" />
                    <p>Level 1</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle-fill" />
                    <p>
                      Level 1
                      <i className="nav-arrow bi bi-chevron-right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Level 2</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>
                          Level 2
                          <i className="nav-arrow bi bi-chevron-right" />
                        </p>
                      </a>
                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i className="nav-icon bi bi-record-circle-fill" />
                            <p>Level 3</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i className="nav-icon bi bi-record-circle-fill" />
                            <p>Level 3</p>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            <i className="nav-icon bi bi-record-circle-fill" />
                            <p>Level 3</p>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="nav-icon bi bi-circle" />
                        <p>Level 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle-fill" />
                    <p>Level 1</p>
                  </a>
                </li>
                <li className="nav-header">LABELS</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle text-danger" />
                    <p className="text">Important</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle text-warning" />
                    <p>Warning</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle text-info" />
                    <p>Informational</p>
                  </a>
                </li>
              </ul>
              {/*end::Sidebar Menu*/}
            </nav>
          </div>
          <div className="os-scrollbar os-scrollbar-horizontal os-theme-light os-scrollbar-auto-hide os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-cornerless os-scrollbar-unusable os-scrollbar-auto-hide-hidden"
            style={{ "--os-viewport-percent": "1", "--os-scroll-direction": "0" }}>
            <div className="os-scrollbar-track">
              <div className="os-scrollbar-handle">
              </div>
            </div>
          </div>

          <div className="os-scrollbar os-scrollbar-vertical os-theme-light os-scrollbar-auto-hide os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-visible os-scrollbar-cornerless os-scrollbar-auto-hide-hidden"
            style={{ "--os-viewport-percent": "0.1787", "--os-scroll-direction": "0" }}>
            <div className="os-scrollbar-track">
              <div className="os-scrollbar-handle" />
            </div>
          </div>

        </div>
      </aside>
    </>
  )
}
