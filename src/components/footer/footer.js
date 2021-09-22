import { Container, Row, Col } from 'react-grid-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faLinkedinIn, faSpotify, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import './footer.css'

function Footer() {
    return (
        <div><hr/><Container><Row>

            <Col md={8} sm={6} xs={12}>
            </Col>

            <Col md={4} sm={6} xs={12}>
                <ul className="social-icons">
                    <li><a className="github" href="https://github.com/GaintDwarf">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a></li>
                    <li><a className="instagram" href="https://www.instagram.com/segevgershon/">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a></li>
                    <li><a className="spotify" href="https://open.spotify.com/user/5wvconvwzeyxa0vb997ginzkv?si=437288757c3843e8">
                        <FontAwesomeIcon icon={faSpotify}/>
                    </a></li>
                    <li><a className="linkedin" href="https://www.linkedin.com/in/segev-gershon-068299204/">
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                    </a></li>
                </ul>
            </Col>
        </Row></Container></div>
    );
}

export default Footer;
