import React from "react"
import css from "./zp125_复选框.css"

function render(ref) {
    if (!ref.props.dbf) return <div>请配置表单字段</div>
    let values = ref.getForm(ref.props.dbf)
    if (!Array.isArray(values)) {
        if (values) warn("表单字段必须是数组")
        values = []
    }
    return ref.options.map((o, i) => <span onClick={() => click(ref, o)} className="zp125item" key={o + i}>
        <span className={"zp125box" + (values.includes(o) ? " checked" : "")}><i/></span>
        <label>{ref.labels[i]}</label>
    </span>)
}

function init(ref) {
    const { excA, props, render } = ref
    if (props.style) {
        ref.container.classList.add(props.style)
        if (props.style === "zcells") setTimeout(() => Array.from(ref.container.children).forEach(a => a.classList.add("zcell")), 9)
    }
    const O = ref.options = excA('clone(o)', { o: props.options || ref.children })
    const L = ref.labels = excA('clone(o)', { o: props.labels || O })
    if (!Array.isArray(O) || !Array.isArray(L)) {
        ref.options = []
        ref.labels = []
        warn("options/labels必须是数组")
    }
    if (O.length !== L.length) warn("options/labels的长度必须一致")
}

function click(ref, v) {
    const { props } = ref
    let values = ref.getForm(props.dbf)
    if (!Array.isArray(values)) values = []
    values.indexOf(v) > -1 ? values.splice(values.indexOf(v), 1) : values.push(v)
    ref.setForm(props.dbf, values)
    if (props.change) ref.exc(props.change, { ...ref.ctx, $val: v }, () => ref.exc("render()"))
}


$plugin({
    id: "zp125",
    props: [{
        prop: "dbf",
        type: "text",
        label: "表单字段"
    }, {
        prop: "options",
        type: "text",
        label: "options选项数组",
        ph: "用括弧包裹表达式，优先于子组件"
    }, {
        prop: "labels",
        type: "text",
        label: "labels标签数组",
        ph: "不填则同options"
    }, {
        prop: "style",
        type: "select",
        label: "样式",
        items: ["inline", "block", "zcells"]
    }, {
        prop: "change",
        type: "exp",
        label: "onChange表达式"
    }],
    render,
    init,
    css
})