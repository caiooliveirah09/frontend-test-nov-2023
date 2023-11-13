import { ZoomInOut } from './Zoom/ZoomInOut.js';

let logMessages = false;

function ConfigsLeaflet(configs) {
    return {
        zoomControl: configs.configuracoesLeaflet.zoomControl,
        zoomSnap: configs.configuracoesLeaflet.zoomSnap,
        zoomDelta: configs.configuracoesLeaflet.zoomDelta,
        minZoom: configs.zoom.min,
        maxZoom: configs.zoom.max,
    };
}

function AdicionaCoordenadasMouse(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    const style = "background-color: rgba(255, 255, 255, 0.5)";
    const className = "text-lg p-2";
    let mousePosControl = L.control.mousePosition({
        position: "bottomleft",
        emptyString: `<div class="${className}" style="${style}">Coordenadas indisponíveis</div>`,
        formatter: function (lng, lat) {
            let pt = projCRS.project(L.latLng(lat, lng));
            if (sistema == 'utm') {
                return `<div class="${className}" style="${style}">${pt.y.toFixed(0)} N : ${pt.x.toFixed(0)} E</div>`;
            }
            return `<div class="${className}" style="${style}">Lat.: ${pt.y.toFixed(5)} | Lon.: ${pt.x.toFixed(5)}</div>`;
        }
    });
    map.addControl(mousePosControl);
    logMessages && console.log("   [CreateMap] Coordenadas do mouse adicionada ao mapa.");
}

function AdicionaEscala(map, largura=150, posicao="bottomright") {
    let escala = L.control.scale({
        position: posicao,
        metric: true,
        imperial: false,
        maxWidth: largura,
    }).addTo(map);
    logMessages && console.log("   [CreateMap] Escala adicionada ao mapa.");
}

function FuncaoVisaoInicial(map, x, y, z) {
    window.SetaVisaoInicial = function () {
        return map.setView([y,x], z);
    };
    logMessages && console.log("   [CreateMap] Função de resetar para visão inicial adicionada.");
}

function FuncoesZoom(map) {
    ZoomInOut(map, window, logMessages);
}

function AdicionaAttribution(map, textoAttribution) {
    map.attributionControl.setPrefix(textoAttribution);
    logMessages && console.log("   [CreateMap] Attribution adicionado ao mapa.");
}

function CriaMenuContexto(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let popup = L.popup();
    const className = "py-1";
    map.on("contextmenu", (e) => {
        let dataAtual = new Date();
        let dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()} ${String(dataAtual.getHours()).padStart(2, '0')}:${String(dataAtual.getMinutes()).padStart(2, '0')}:${String(dataAtual.getSeconds()).padStart(2, '0')}`;
        let coordenada = projCRS.project(L.latLng(e.latlng.lat, e.latlng.lng));
        if (sistema == 'utm') {
            let content = "<b>N</b>: " + coordenada.y.toFixed(0) + "<br><b>E</b>: " + coordenada.x.toFixed(0) + "<br>";
        }
        let content = `<div class="${className}"><b>Lat.</b>: ${coordenada.y.toFixed(5)}</div>
        <div class="${className}"><b>Lon.</b>: ${coordenada.x.toFixed(5)}</div>
        <div class="${className} flex"><i class="flex justify-center" style="margin-right: 8px"><img src="icons/calendar-regular.svg" class="inline w-4"/></i>${dataFormatada}</div>`;
        content = `<div class="mb-3">${content}</div>`;
        popup.setLatLng(e.latlng).setContent(content).openOn(map);
    });
    logMessages && console.log("   [CreateMap] Menu de contexto adicionado ao mapa.");
}

function FuncaoMapaInformacoes(mapa) {
    window.MapaInformacoes = function () {
        let zoom = mapa.getZoom();
        let centro = mapa.getCenter();
        let bounds = mapa.getBounds();
        let informacoes = {
            zoom:zoom,
            centro:centro,
            bounds:bounds,
            xyz: {
                x: centro.lng,
                y: centro.lat,
                z: zoom
            }
        };
        let userInput = prompt("Digite as coordenadas em ordem 'latitude longitude'\n\nSepare as coordenadas por espaço.\n\nEx:\n-23.123456 -46.123456");
        let userInputText = userInput.split(" ");
        let userInputLat = parseFloat(userInputText[0]);
        let userInputLng = parseFloat(userInputText[1]);
        let markerIcon = L.icon({
            iconUrl: '/maps/icons/marker-icon.png',
            shadowUrl: '/maps/icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        let marker = L.marker([userInputLat, userInputLng], {icon : markerIcon}).addTo(mapa);
        mapa.setView([userInputLat, userInputLng], 15);
        return informacoes;
    };
    logMessages && console.log(mapa);
}

export {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    FuncoesZoom,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes
}
