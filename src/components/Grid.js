import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import { isLoggedIn } from '../utils/AuthService';
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'

const columns = { lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }

const rowHeight = {
  collection: 200,
  subcollection: 200,
  resource: 320,
  user: 300,
  team: 260,
}

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.itemDragged = false

    this.state = {
      layouts: this.generateLayout(props.data.map(d => d._id)),
      currentBreakpoint: "lg",
      width: 0
    };
  }

  onBreakpointChange = breakpoint => {
    console.log("breakpoint changing!")
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onWidthChange = props => {
    console.log("width changed!")
    // this.setState({
    //   width: props.containerWidth
    // })
  }

  generateDOM() {
    const { data, clickHandler, type, editingMode } = this.props;

    let fullList = editingMode ? [...data, ...[{}]] : data

    let gridItems = fullList.map((d, i) => {
      if (i === data.length) { return this.addCreateGridItem()}

      if (type === "collection") {
        return this.renderCollectionItem(d, i)
      } else if (type === "subcollection") {
        return this.renderSubcollectionItem(d, i)
      } else if (type === "resource") {
        return this.renderResourceItem(d, i)
      } else if (type === "team") {
        return this.renderTeamItem(d, i)
      } else {
        return this.renderUserItem(d, i)
      }
    });

    return gridItems
  }

  renderCollectionItem(d, i) {
    const { data, clickHandler, showTeam} = this.props;
    let background;
    if (d.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + d.image_url + ')'
      background = (
        <div className="grid__item__image" style={styleObject} ></div>
      )
    } else {
      background = (
        <div className="grid__item__image"><SvgIcon name="folder" /></div>
      )
    }
    return (
      <div key={d._id} className={"grid__item item-type-collection"} onClick={() => { this.itemDragged ? null : clickHandler(data, i)}}>
        {background}
        <div className="grid__item__content">
          <div className="grid__item__text">
            {showTeam && <h5 className="grid__item__text__sub">{d.team}</h5>}
            <h5 className="grid__item__text__main">{d.title}</h5>
          </div>
        </div>
      </div>
    );
  }

  renderSubcollectionItem(d, i) {
    const { data, clickHandler} = this.props;

    let background;
    if (d.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + d.image_url + ')'
      background = (
        <div className="grid__item__image" style={styleObject} ></div>
      )
    } else {
      background = (
        <div className="grid__item__image"><SvgIcon name="folder" /></div>
      )
    }
    return (
      <div key={d._id} className={"grid__item item-type-subcollection"} onClick={() => this.itemDragged ? null : clickHandler(data, i)}>
        {background}
        <div className="grid__item__content">
          <div className="grid__item__text">
            <SvgIcon name="folder" />
            <h5 className="grid__item__text__main">{d.title}</h5>
          </div>
        </div>
      </div>
    );
  }

  renderResourceItem(d, i) {
    const { data, clickHandler} = this.props;
    let background;
    let iconName;

    if (d.resource_type === "video") {
      iconName = "video"
    } else if (d.resource_type === "richtext") {
      iconName = "text"
    } else {
      iconName = "document"
    }

    if (d.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + d.image_url + ')'
      background = (
        <div className="grid__item__image" style={styleObject} ></div>
      )
    } else {
      background = (
        <div className="grid__item__image"><SvgIcon name={iconName} /></div>
      )
    }
    return (
      <div key={d._id} className={"grid__item item-type-resource"} onClick={() => this.itemDragged ? null : clickHandler(data, i)}>
        <div className="grid__item__content">
          <div className="grid__item__text">
            <SvgIcon name={iconName} />
            <h5 className="grid__item__text__main">{d.title}</h5>
          </div>
        </div>
        {background}
      </div>
    );
  }

  renderTeamItem(d, i) {
    const { data, clickHandler, buttonClickHandler, editingMode} = this.props;
    let background;
    if (d.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + d.image_url + ')'
      background = (
        <div className="grid__item__image" style={styleObject} ></div>
      )
    } else {
      background = (
        <div className="grid__item__image"><SvgIcon name="team" /></div>
      )
    }
    return (
      <div key={d._id} className={"grid__item item-type-team"}  onClick={() => clickHandler(d)}>
        {background}
        <div className="grid__item__content">
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{d.team_name}</h5>
            <h5 className="grid__item__text__sub">{d.users.length + " Members"}</h5>
            {editingMode && buttonClickHandler && <div className="button button-white" onClick={() => buttonClickHandler(d)}>Leave This Team</div>}
          </div>
        </div>
      </div>
    );
  }

  renderUserItem(d, i) {
    const { data, buttonClickHandler, editingMode} = this.props;
    let background;
    if (d.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + d.image_url + ')'
      background = (
        <div className="grid__item__image" style={styleObject} ></div>
      )
    } else {
      background = (
        <div className="grid__item__image"><SvgIcon name="user" /></div>
      )
    }
    return (
      <div key={d._id} className={"grid__item item-type-user"}>
        {background}
        <div className="grid__item__content">
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{d.name}</h5>
            <h5 className="grid__item__text__sub">{d.email}</h5>
            {editingMode && <div className="button button-white" onClick={() => buttonClickHandler(d)}>Remove User from Team</div>}
          </div>
        </div>
      </div>
    );
  }

  addCreateGridItem() {
    const { data, createNew, type, createNewText } = this.props;

    return(
      <div key="Create" className="grid__item add-new" onClick={() => createNew()}>
        <div className="grid__item__add-new-content">
          <SvgIcon className="grid__item__plus" name="plus" />
          <div className="grid__item__text">
            <h5 className="grid__item__text__sub">{createNewText}</h5>
          </div>
        </div>
      </div>
    )
  }

  generateLayout(idList) {
    const {editingMode} = this.props
    let layouts = {};

    for (let key in columns) {
      let numColumns = columns[key]

      let fullList = editingMode ? [...idList, ...["Create"]] : idList

      layouts[key] = fullList.map((d, i) => {
        return {
          x: i%numColumns,
          y: Math.floor(i/numColumns),
          w: 1,
          h: 1,
          i: d,
        }
      })
      // let createNewIndex = idList.length
      // layouts[key].push(
      //   {
      //     x: createNewIndex%numColumns,
      //     y: Math.floor(createNewIndex/numColumns),
      //     w: 1,
      //     h: 1,
      //     i: "Create New",
      //     static: true,
      //   }
      // )
    }
    return layouts
  }

  onDragStop(layout, oldItem, newItem, placeholder, e, element) {
    if (oldItem.x !== newItem.x || oldItem.y !== newItem.y) {
      this.itemDragged = true
    }
  }

  onLayoutChange(layout, layouts) {
    console.log("in on layout change")
    console.log(layout, layouts)

    if (this.itemDragged) {
      let currDataOrder = [...layout].filter(d => d.i !== "Create").sort((a, b) => {
        if (a.y < b.y) {
          return -1
        } else if (a.y > b.y) {
          return 1
        } else {
          if (a.x < b.x) {
            return -1
          } else if (a.x > b.x) {
            return 1
          }
        }
        return 0
      }).map(d => d.i)

      this.props.reOrderHandler(currDataOrder)
      this.setState({
        layouts: this.generateLayout(currDataOrder)
      });
    } else {
      this.setState({
        layouts: this.generateLayout(this.props.data.map(d => d._id))
      });
    }
  }

  // checkContiguous(layout) {
  //   const numColumns = columns(this.state.currentBreakpoint)
  //   console.log(numColumns)
  //   for (let i = 0; i < numColumns; i++) {
  //
  //   }
  // }

  render() {
    const {type, isDraggable, editingMode} = this.props

    console.log("in render")
    console.log(this.props)

    return (
      <ResponsiveReactGridLayout
        layouts={this.state.layouts}
        margin= {[15, 15]}
        containerPadding= {[20, 20]}
        isResizable={false}
        isDraggable={editingMode && isDraggable}
        cols= {columns}
        onBreakpointChange={() => this.onBreakpointChange()}
        onDragStop={this.onDragStop.bind(this)}
        onLayoutChange={this.onLayoutChange.bind(this)}
        onWidthChange={() => this.onWidthChange()}
        measureBeforeMount={false}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="horizontal"
        rowHeight={rowHeight[type]}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
