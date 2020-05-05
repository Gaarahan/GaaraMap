import AMap from 'AMap';
import attractions from "../data/attractions";

export function getCurAttractionMessage(geo) {
  const index = attractions.findIndex(attraction => {
    return AMap.GeometryUtil.isPointInRing(geo.position, attraction['edge']);
  });

  return ~index
      ? Object.assign({}, attractions[index], {
          name: `正在游览： ${attractions[index].name}`,
      })
      : {name: '当前位置无景点信息', id: 'GMAP_0', description: ''};
}

export function refreshCurrentAttractionSquare(map, attr) {
  const polygon = new AMap.Polygon({
    path: attr.edge,
    strokeColor: "#e1d1ff",
    strokeWeight: 3,
    strokeOpacity: 0.2,
    fillOpacity: 0.2,
    fillColor: '#72c0fc',
    zIndex: 50,
  });

  map.add(polygon);
  map.setFitView([ polygon ]);
  return attr.id;
}
