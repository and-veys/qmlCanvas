import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls 2.12
import "main.js" as MyJs

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Домашняя работа #5")
    Item {
        id: item
        width:  parent.width
        height: parent.height-50
    }
    Button {
        id: button
        anchors.top: item.bottom
        anchors.horizontalCenter: parent.horizontalCenter
        text: "Следующая страница"
        onClicked: MyJs.nextPage(item)
    }
    Component.onCompleted: MyJs.createPage(item);
}
