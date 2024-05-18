import logo from "../../asset/logo2.png";

export default function LoginLayout({ children }) {
    return (
        <section className="hero is-fullheight ">
            <div className="columns">
                <div className="column is-one-third *t">
                        <figure className="image is-3by1 ">
                            <img src={logo} />
                        </figure>
                    </div>
                </div>
            <div className="hero-body">
            
                <div className="container">
                    <div className="columns is-centered title">
                        <div className="column is-7-tablet is-5-desktop is-6-widescreen">
                            <div className="columns is-centered is-size-1">WELCOME!</div>
                            <form action="" className="">
                                {children}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
