import logo from '../images/308520e.png';

export const Header = (props) => {

    const changeLanguage = (language) => {
        console.log(`Dil dəyişdirildi: ${language}`);
      };

    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
            <div className="container-fluid custom-container">
                <a className="navbar-brand" href="#"><img src={logo} className="logo" alt=""></img></a>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="d-flex align-items-center">
                    <ul className="nav nav-tabs border-0" id="ex1" role="tablist">
                        <li className="nav-item description_tab Tab h-100" role="presentation">
                            <a className="nav-link h-100 active" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1"
                                role="tab" aria-controls="ex1-tabs-1" aria-selected="true"><span>Ana səhifə</span></a>
                        </li>
                        <li className="nav-item description_tab Tab h-100" role="presentation">
                            <a className="nav-link h-100" id="ex1-tab-2" data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab"
                                aria-controls="ex1-tabs-2" aria-selected="false">Haqqımızda</a>
                        </li>
                        <li className="nav-item h-100" role="presentation">
                            <a className="nav-link h-100" id="ex1-tab-3" data-mdb-toggle="tab" href="#ex1-tabs-3" role="tab"
                                aria-controls="ex1-tabs-3" aria-selected="false">Yardımlar</a>
                        </li>
                        <li className="nav-item description_tab Tab h-100" role="presentation">
                            <a className="nav-link h-100" id="ex1-tab-4" data-mdb-toggle="tab" href="#ex1-tabs-4" role="tab"
                                aria-controls="ex1-tabs-4" aria-selected="false">Vəsaitdən istifadə</a>
                        </li>
                        <li className="nav-item description_tab Tab h-100" role="presentation">
                            <a className="nav-link h-100" id="ex1-tab-5" data-mdb-toggle="tab" href="#ex1-tabs-5" role="tab"
                                aria-controls="ex1-tabs-5" aria-selected="false">Elanlar</a>
                        </li>
                    </ul>

                    <div id="language-selector">
                        <button id="az-btn" onClick={() => changeLanguage('az')}>AZ</button>
                        <button id="en-btn" onClick={() => changeLanguage('en')}>EN</button>
                        <button id="ru-btn" onClick={() => changeLanguage('ru')}>RU</button>
                    </div>
                    <div className="user">
                        <a href="#" className="align-bottom"><svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 448 512">
                                <path
                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                </svg></a>
                    </div>
                </div>


            </div>
        </nav>
    </>);
}