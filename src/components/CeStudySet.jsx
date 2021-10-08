import '../assets/styles/CeStudySet.css'
import { Textarea } from '../components'
import { Button, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useState, useEffect, useRef, useCallback } from "react"
import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import { Notify, Firebase } from "../utils"
import { useHistory } from "react-router-dom"
import { ROUTER_PATH } from '../constants'

const CeStudySet = (props) => {
    const { id, studysetProp } = props
    const history = useHistory()
    const [ y, setY ] = useState(window.scrollY)
    const strickyRef = useRef(null)

    const createWordCart = (key, value) => ({
        id: uuidv4(),
        key: key ? key : '',
        value: value ? value : '',
        errorkey: '',
        errorvalue: ''
    })

    const [studyset, setStudyset] = useState({
        title: {
            value: studysetProp ? studysetProp.title : '',
            error: ''
        },
        description: {
            value: studysetProp ? studysetProp.description : '',
            error: ''
        },
        wordCarts: studysetProp
            ? studysetProp.wordCarts.map(item => createWordCart(item.key, item.value))
            : [createWordCart('', ''), createWordCart('', ''), createWordCart('', '')]
    })

    const validate = () => {
        let res = true
        const newStudyset = _.cloneDeep(studyset)
        newStudyset.title.value = newStudyset.title.value.trim()
        newStudyset.description.value = newStudyset.description.value.trim()
        newStudyset.wordCarts = newStudyset.wordCarts
            .map(item => ({ ...item, key: item.key.trim(), value: item.value.trim() }))

        const { title, description, wordCarts } = newStudyset

        if (!title.value) {
            title.error = 'Title cannot be left blank!'
            res = false
        }
        if (!description.value) {
            description.error = 'Description cannot be left blank!'
            res = false
        }

        for (const item of wordCarts) {
            if (!item.key) {
                item.errorkey = 'Term cannot be left blank!'
                res = false
            }
            if (!item.value) {
                item.errorvalue = 'Definition cannot be left blank!'
                res = false
            }
        }

        setStudyset(newStudyset)
        return res
    }

    const cleanStudyset = studyset => {
        return {
            title: studyset.title.value.trim(),
            description: studyset.description.value.trim(),
            wordCarts: studyset.wordCarts.map(item => ({key: item.key.trim(), value: item.value.trim()}))
        }
    }

    const handlesubmit = () => {
        if (validate()) {
            const studysetDb = cleanStudyset(studyset)

            let res = false
            if(studysetProp) res = Firebase.updateStudySet(id, studysetDb)
            else  res = Firebase.addStudySet(studysetDb)
            
            if (res) {
                Notify.success(studysetProp ? "Update success!" : "Create success!" )
                history.replace(ROUTER_PATH.STUDY_SET)
            }
            else Notify.error('Error, try again!')
        }
    }

    const handleWordCartChange = (index, value, attribute) => {
        const newStudyset = _.cloneDeep(studyset)
        newStudyset.wordCarts[index][attribute] = value
        newStudyset.wordCarts[index][`error${attribute}`] = ''
        setStudyset(newStudyset)
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result
        const startIndex = source.index
        const endIndex = destination.index

        const newWordCarts = _.cloneDeep(studyset.wordCarts)
        const [ removed ] = newWordCarts.splice(startIndex, 1)
        newWordCarts.splice(endIndex, 0, removed)
        setStudyset({...studyset, wordCarts: newWordCarts})
    }

    const handleScroll = useCallback(e => {
        const window = e.currentTarget;
        if (y > window.scrollY) 
            console.log("scrolling up")
        else if (y < window.scrollY) 
            console.log("scrolling down")
        setY(window.scrollY)
    }, [y])

    useEffect(() => {
        console.log(y)
    }, [y])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return <div className="CeStudySet-container">
        <div className="stricky-information" ref={strickyRef}>
            <div className="container-xl">
                <div className="infomation d-sm-flex">
                    <p className="title">
                        {studysetProp ? "Update study set" : "Create a new study set"}
                    </p>
                    <Button className="fw-bold mt-3 mt-sm-0" onClick={handlesubmit}>
                        {studysetProp ? "Save" : "Create"}
                    </Button>
                </div>
            </div>
        </div>

        <div className="container-xl">
            <div className="row">
                <div className="col col-md-6">
                    <Textarea
                        enter={false}
                        title="TITLE"
                        placeholder='Enter a title, like "Animals"'
                        value={studyset.title.value}
                        error={studyset.title.error}
                        maxLength={255}
                        onChange={e => setStudyset({ ...studyset, title: { value: e.target.value, error: '' } })}
                    />
                </div>
            </div>

            <div className="row my-4">
                <div className="col col-md-6">
                    <Textarea
                        enter={false}
                        title="DESCRIPTION"
                        placeholder='Add a description'
                        value={studyset.description.value}
                        error={studyset.description.error}
                        maxLength={255}
                        onChange={e => setStudyset({ ...studyset, description: { value: e.target.value, error: '' } })}
                    />
                </div>
            </div>
        </div>

        <div className="wordCarts py-4">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) =>
                        <div className="container-xl" {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                studyset.wordCarts.map((item, index) =>
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) =>
                                            <div className="wordCart-input mb-4" key={item.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...provided.draggableProps.style }}>
                                                <div className="header">
                                                    <span className="index">{index + 1}</span>
                                                    <span className="ms-auto drag-icon"><i className="fas fa-grip-lines" /></span>

                                                    <OverlayTrigger placement="left" overlay={<Tooltip>Remove</Tooltip>}>
                                                        <Badge
                                                            bg="danger" className="delete-icon"
                                                            onClick={e => setStudyset({
                                                                ...studyset,
                                                                wordCarts: [...studyset.wordCarts.filter((item, i) => studyset.wordCarts.length > 3 ? i !== index : true)]
                                                            })}
                                                        ><i className="fas fa-trash-alt fs-6" /></Badge>
                                                    </OverlayTrigger>
                                                </div>

                                                <div className="row input-type">
                                                    <div className="col-md-6">
                                                        <Textarea
                                                            enter="true"
                                                            title="TERM"
                                                            placeholder='Enter term'
                                                            value={item.key}
                                                            error={item.errorkey}
                                                            onChange={e => handleWordCartChange(index, e.target.value, 'key')}
                                                        />
                                                    </div>

                                                    <div className="col-md-6 mt-5 mt-md-0">
                                                        <Textarea
                                                            enter="true"
                                                            title="DEFINITION"
                                                            placeholder='Enter definition'
                                                            value={item.value}
                                                            error={item.errorvalue}
                                                            onChange={e => handleWordCartChange(index, e.target.value, 'value')}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </Draggable>
                                )
                            }
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>

            <div className="d-flex">
                <Button
                    variant="success"
                    className="fw-bold d-block d-sm-inline-block mx-auto"
                    onClick={e => setStudyset({
                        ...studyset,
                        wordCarts: [...studyset.wordCarts, { id: uuidv4(), key: '', value: '' }]
                    })}
                >
                    <i className="fas fa-plus"></i> Add card
                </Button>
            </div>
        </div>
    </div>
}

export default CeStudySet