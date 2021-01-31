export const DateFromTo = ({ width, height }) => {

    width = width || "auto"
    height = height || "30px"

    return (
        <span style={{
            width,
            height,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "auto",
            paddingRight: "auto",
            flexWrap: "wrap"
        }}>
            <label>เลือกวันที่</label>
            <span style={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
                <input type="date" style={{ margin: "5px" }} />
                <span style={{ background: "#e6e6e6e" }}>ถึง</span>
                <input type="date" style={{ margin: "5px" }} />
            </span>
        </span>
    )
}