import { Link } from "react-router-dom";
import { Nav } from "./styles";

interface IProps {
    crumbs: { urlSegment?: string; label: string; }[];
}

export const Breadcrumb = (props: IProps) => (
    <Nav>
        {props.crumbs.map((crumb, i) => {
            if (crumb.urlSegment) {
                const link = `/${props.crumbs.slice(0, i + 1).map(c => c.urlSegment).join("/")}`;

                return <Link key={i} to={link}>{crumb.label}</Link>;
            } else {
                return <span key={i}>{crumb.label}</span>;
            }
        })}
    </Nav>
);
