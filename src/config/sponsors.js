/**
 * Aliados / patrocinadores que se muestran en la landing y en las pantallas de acceso.
 * Para agregar o quitar uno solo hay que editar esta lista.
 */
import viper from "../assets/sponsors/viper.png";
import chapola from "../assets/sponsors/chapola.png";
import nuevoFuturo from "../assets/sponsors/nuevo-futuro.png";

export const SPONSORS = [
  {
    name: "Viper Venom Coffee",
    logo: viper,
    width: 318,
    height: 360,
    href: "https://www.instagram.com/viper_venomcoffe/",
  },
  {
    name: "Chapola Company",
    logo: chapola,
    width: 420,
    height: 242,
  },
  {
    name: "Asociación de Productores Orgánicos Nuevo Futuro",
    logo: nuevoFuturo,
    width: 97,
    height: 111,
  },
];
