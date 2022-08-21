const Search = (props) => {

    function search() {
        alert("serching");
    }
    return <div className="flexItems" style={{
        // width: "100%",
        display: props.show ? "inherit" : "none"
    }}>

        <form onSubmit={search} style={{ alignItems: "center", display: "flex" }}>

            <input type={"text"} style={{
                width: "9em",
                borderWidth: "0px 0px 2px 0px",
                borderColor: "inherit",
                paddingBottom: "0px!important",
                backgroundColor: "inherit",
                outline: "none"
            }}></input>

            <button type="submit">
                <i className="bi bi-search"></i>
            </button>

        </form>

    </div>
}

export default Search;