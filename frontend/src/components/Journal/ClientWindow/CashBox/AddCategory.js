import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import plusUnBordered from '/src/assets/img/journal/coloring-plus-without-border.svg'
import minusUnBordered from '/src/assets/img/journal/coloring-minus-without-border.svg'
import plus from '/src/assets/img/journal/coloring-plus.svg'
import minus from '/src/assets/img/journal/coloring-minus.svg'
import {roundFifty} from "./Coloring";
import DropDown from "./DropDown";


function AddCategory(props) {
    let [materialList, setMaterialList] = useState([
        {index: 1, name: '', quantity: 0}
    ])

    let [activeMaterialField, setActiveMaterialField] = useState(null)

    useEffect(() => {
        let visit = JSON.parse(localStorage.getItem(`visit ${1}`))
        let newMaterialList = []
        if (visit) {
            for (let elem of visit) {
                if (elem.id === props.index) newMaterialList.push(...elem.materials)
            }
        }
        if (newMaterialList.length > 0) setMaterialList(newMaterialList)
    }, [])

    useEffect(() => {
        let visitId = 1
        let visit = JSON.parse(localStorage.getItem(`visit ${visitId}`))
        if (!visit) {
            visit = [
                {
                    id: props.index,
                    category: props.catValue,
                    materials: materialList
                }
            ]
        } else {
            let inVisit = false
            visit.map((elem) => {
                if (elem.id === props.index) {
                    inVisit = true
                    elem.category = props.catValue
                    elem.materials = materialList
                }
                return elem
            })

            if (!inVisit) {
                visit = [
                    ...visit,
                    {
                        id: props.index,
                        category: props.catValue,
                        materials: materialList
                    }
                ]
            }

            let flourCount = 0
            let paintCount = 0
            for (let elem of visit) {
                if (elem.category === 'Порошок') {
                    for (let mat of elem.materials) flourCount += Number(mat.quantity)
                } else {
                    for (let mat of elem.materials) paintCount += Number(mat.quantity)
                }
            }
            let total = flourCount * props.flourPrice + paintCount * props.paintPrice

            props.setFlourSumValue(flourCount)
            props.setPaintSumValue(paintCount)
            props.setPaintSumPrice(roundFifty(total))
        }

        localStorage.setItem(`visit ${visitId}`, JSON.stringify(visit))
    }, [materialList, props.catValue])

    function handleRemoveMaterial(index) {
        setMaterialList(materialList.filter((elem, i) => elem['index'] !== index))
    }

    function handleAddMaterial() {
        let newIndex = materialList.length + 1

        for (let elem of materialList) {
            if (elem['index'] === newIndex) newIndex++
        }
        if (materialList.length <= 4) setMaterialList([...materialList, {index: newIndex, name: '', quantity: 0}])
    }

    function handleChangeMatName(name, index) {
        setMaterialList(materialList.map((elem) => {
            if (elem['index'] === index) elem['name'] = name
            return elem
        }))
    }

    function handleChangeQuantity(e, matIndex) {
        let value = e.target.value

        if (!isNaN(Number(value)) && value.length <= 3) {
            setMaterialList(materialList.map((mat) => {
                if (mat['index'] === matIndex) {
                    mat['quantity'] = value
                }
                return mat
            }))
        }
    }

    function ActivateCategory() {
        props.setActiveCategory(props.index)
        setActiveMaterialField(null)
    }

    function ActivateMaterial(matIndex) {
        props.setActiveCategory(props.index)
        setActiveMaterialField(matIndex)
    }

    function SetCatValueWithDropDown(name) {
        props.setCatValue(name)
        props.setActiveCategory(null)
        setActiveMaterialField(null)
    }

    function SetMatValueWithDropDown(name, index) {
        handleChangeMatName(name, index)
        props.setActiveCategory(null)
        setActiveMaterialField(null)
    }

    return (
        <div className="add-client-window__category" onClick={(e) => e.stopPropagation()}>
            <div className="add-category">
                {props.index === props.lastIndex ?
                    <img className='plus-category' src={plus} alt="добавить" onClick={props.onAdd}/> :
                    <div className="nothing"/>}

                <div className="input-category__block">
                    {props.index === props.activeCategory && !activeMaterialField &&
                        <DropDown data={['Порошок', 'SoColor', 'SoColor Sync']}
                                  setInputValue={(name) => SetCatValueWithDropDown(name)}/>}

                    <textarea className="input input-category"
                              placeholder="Категория"
                              rows={1}
                              value={props.catValue}
                              onChange={(e) => props.setCatValue(e.target.value)}
                              onFocus={ActivateCategory}/>
                </div>

            </div>
            <div className="materials">
                {materialList && materialList.map((mat, matIndex) => {
                    return <div className="add-material" key={mat['index']}>

                        {props.activeCategory === props.index && mat['index'] === activeMaterialField &&
                            <DropDown data={['7n', '8b', '9MN']}
                                      setInputValue={(name) => SetMatValueWithDropDown(
                                          name, activeMaterialField)}/>}

                        <textarea className="input input-material"
                                  placeholder="Материал"
                                  rows={1}
                                  value={mat['name']}
                                  onChange={(e) => handleChangeMatName(e.target.value, mat['index'])}
                                  onFocus={() => ActivateMaterial(mat['index'])}/>
                        {matIndex === 0 ?
                            <div className='plus' onClick={() => handleAddMaterial()}>
                                <img src={plusUnBordered} alt='добавить'/>
                            </div> :
                            <div className='minus' onClick={() => handleRemoveMaterial(mat['index'])}>
                                <img className="minus" src={minusUnBordered} alt='убрать'/>
                            </div>}

                        <div className="quantity">
                            <textarea rows={1}
                                      className="input input-quantity"
                                      value={mat['quantity']}
                                      onChange={(e) => handleChangeQuantity(e, mat['index'])}/>
                        </div>

                        {props.index !== 1 && matIndex === 0 &&
                            <img className="remove-category" src={minus} onClick={props.onRemove} alt='удалить'/>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(AddCategory);
