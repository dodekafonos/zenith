import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa o CSS padrão

function SmallHomeCarousel() {
  return (
    <div style={{width: '80%', margin: '0 auto' }}>
      <Carousel 
        showArrows={true} 
        showThumbs={false} 
        infiniteLoop={true} 
        autoPlay={true} 
        interval={3000} 
        transitionTime={500}
        dynamicHeight={true}
      >
        <div>
          <img src="https://via.placeholder.com/400x200?text=Imagem+1" alt="Imagem 1" />
          <p className="legend">Legenda da Imagem 1</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x200?text=Imagem+2" alt="Imagem 2" />
          <p className="legend">Legenda da Imagem 2</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x200?text=Imagem+3" alt="Imagem 3" />
          <p className="legend">Legenda da Imagem 3</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x200?text=Imagem+4" alt="Imagem 4" />
          <p className="legend">Legenda da Imagem 4</p>
        </div>
      </Carousel>
    </div>
  );
}

export default SmallHomeCarousel;
