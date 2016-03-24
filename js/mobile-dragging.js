"use strict";

let dragObject = {};

const getCoords = (elem) => {
	let box = elem.getBoundingClientRect();
	
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	}
};

const createAvatar = (e) => {
	let avatar = dragObject.elem;
	let old = {
		parent: avatar.parentNode,
		nextSibling: avatar.nextSibling,
		position: avatar.position || "",
		left: avatar.left,
		top: avatar.top,
		zIndex: avatar.zIndex
	};
	
	avatar.rollback = () => {
		old.parent.insertBefore(avatar, old.nextSibling);
		avatar.style.position = old.position;
		avatar.style.left = old.left;
		avatar.style.top = old.top;
		avatar.style.zIndex = old.zIndex;
	};
	
	return avatar;
};

const startDrag = (e) => {
	let avatar = dragObject.avatar;
	
	document.body.appendChild(avatar);
	avatar.style.zIndex = 9999;
	avatar.style.position = "absolute";
};

const finishDrag = (e) => {
	let dropElem = findDroppable(e);
	
	if (!dropElem) {
		dragObject.avatar.rollback();
	} else {
		dragObject.elem.style.display = "none";
		dropElem.classList.add('computer-smile');
		setTimeout(() => dropElem.classList.remove('computer-smile'), 200);
	}
};

const findDroppable = (e) => {
	dragObject.avatar.hidden = true;
	let elem = document.elementFromPoint(e.changedTouches[e.changedTouches.length-1].clientX, e.changedTouches[e.changedTouches.length-1].clientY);
	dragObject.avatar.hidden = false;
	
	if (elem == null)
		return null;
	
	return elem.closest(".droppable");
};

const touchstart = (e) => {
	var elem = e.target.closest(".draggable");
	if (!elem) return;
	
	dragObject.elem = elem;
	
	dragObject.downX = e.targetTouches[0].pageX;
	dragObject.downY = e.targetTouches[0].pageY;
	
	return false;
};

const touchmove = (e) => {
	if (!dragObject.elem) return;
	
	if (!dragObject.avatar) {
		var moveX = e.targetTouches[0].pageX - dragObject.downX;
		var moveY = e.targetTouches[0].pageY - dragObject.downY;
		
		if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
			return;
		}
		
		dragObject.avatar = createAvatar(e);
		if (!dragObject.avatar) {
			dragObject = {};
			return;
		}
		
		let coords = getCoords(dragObject.avatar);
		dragObject.shiftX = dragObject.downX - coords.left;
		dragObject.shiftY = dragObject.downY - coords.top;
		
		startDrag(e);
	}
	
	dragObject.avatar.style.left = e.targetTouches[0].pageX - dragObject.shiftX + "px";
	dragObject.avatar.style.top = e.targetTouches[0].pageY - dragObject.shiftY + "px";
};

const touchend = (e) => {
	if (dragObject.avatar) {
		finishDrag(e);
	}
	
	dragObject = {};
	console.log("You finished touch");
};

const touchcancel = (e) => {
	console.log("You cancelled touch");
};

document.addEventListener("touchstart", touchstart, false);
document.addEventListener("touchmove", touchmove, false);
document.addEventListener("touchend", touchend, false);
document.addEventListener("touchcancel", touchcancel, false);

let mDraggable = document.querySelector("#mobile-draggable");
mDraggable.onmousemove((e) => {
	
});