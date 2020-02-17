// This class is not used in the project yet.
class Text {
    // The constructor has three parameters. Here is an example of how you would create
    // an instance of this class
    // Modified to take a fourth argument, font size (optional so I don't have to retrofit existing elements)
    constructor(root, xPos, yPos, fontsize, reg) {
        // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
        // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
        const div = document.createElement("div");
        div.style.position = 'absolute'
        div.style.left = xPos;
        div.style.maxWidth = GAME_WIDTH;
        div.style.top = yPos;
        div.style.color = 'white';
        div.style.font = `${(reg) ? "" : "bold "}${fontsize || 30}px Impact`;
        div.style.zIndex = 2000;
        root.appendChild(div);
        this.domElement = div;
    }
    // This method is used to update the text displayed in the DOM element
    update(txt) {
        this.domElement.innerText = txt;
    }
}

class Introtext extends Text {
    constructor(root, xPos, yPos, fontsize, content, reg) {
        super(root, xPos, yPos, fontsize, reg);
        this.content = content;
        this.domElement.innerText = content;
    }
};