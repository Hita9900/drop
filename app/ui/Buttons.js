export default function ButtonStandard({title, icon}) {
    return(
        <a href="#"><button className="button">
            <i className="demo-icon">{icon}</i>&nbsp;{title}</button>
        </a>
    );
}