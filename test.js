n.lookAtTransform(e.rotateFrame),
    e.rotateInitialCameraAngle=Math.atan2(n.position.y,n.position.x),
    e.rotateInitialCameraDistance=s.magnitude(new s(n.position.x,n.position.y,0)),
    n.lookAtTransform(m),
    e.rotateMouseMoveFunction=function(r){var i=t.getBoundingClientRect(),n=new a((i.right-i.left)/2,(i.bottom-i.top)/2),o=new a(r.clientX-i.left,r.clientY-i.top),s=a.subtract(o,n,x),u=Math.atan2(-s.y,s.x),c=u-e.rotateInitialCursorAngle,h=l.zeroToTwoPi(e.rotateInitialCameraAngle-c),d=e.terria.cesium.scene.camera,m=p.clone(d.transform,E);d.lookAtTransform(e.rotateFrame);var f=Math.atan2(d.position.y,d.position.x);d.rotateRight(h-f),d.lookAtTransform(m),e.terria.cesium.notifyRepaintRequired()},e.rotateMouseUpFunction=function(t)