import QtQuick 2.12
import QtQuick.Controls 2.12
import "main.js" as MyJs

Rectangle {
    width:  parent.width
    height:  parent.height
    color:  "lightgreen"
    ComboBox {
        id: combo
        width:  parent.width
        model: MyJs.getFigures()
        onActivated: picture.requestPaint()
    }
    Canvas {
        id: picture
        anchors.top: combo.bottom
        width:  parent.width
        height:  parent.height - 50
        onPaint: MyJs.paintPicture(picture, combo.currentText);

    }
}

