import { Column, Columns } from "./Column";

export default function Layout({ left, right, ratio, hideLeft, toggleHideLeft }) {
    return (<Columns isGapless={true}>
        {hideLeft ? null : <Column ratio={ratio[0]}>{left}</Column>}
        <Column>
            <section className="hero has-background-light	 is-fullheight ">
                <button className="button is-primary " onClick={toggleHideLeft}>
                    <span className="icon">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                </button>
            </section>
        </Column>
        <Column ratio={hideLeft ? 12 : ratio[1]}>
            <section className="hero has-background-light	 is-fullheight ">
                <div className="hero-background">
                    {right}
                </div>
            </section>
        </Column>
    </Columns>);
}
