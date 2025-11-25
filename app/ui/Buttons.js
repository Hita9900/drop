export default function ButtonStandard({title, icon, address}) {
    return(
       <a href={address}>
      <button className="button">
        {icon && <i className="demo-icon">{icon}</i>}
        {icon && <>&nbsp;</>}
        {title}
      </button>
    </a>
    );
}

