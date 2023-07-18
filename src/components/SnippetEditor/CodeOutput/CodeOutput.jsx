// hooks
import { useState } from "react";

// context
import { useSnippetEdit } from "../../../SnippetEditorContext";

// components
import ButtonPrimary from "../../global/ButtonPrimary/ButtonPrimary";
import CodeBlock from "../../global/CodeBlock/CodeBlock";

// styles
import styles from "./CodeOutput.module.scss";

export default function CodeOutput() {
    const [codeType, setCodeType] = useState([
        { id: 1, isActive: false, label: "HTML" },
        { id: 2, isActive: true, label: "CSS" },
        // Add more button objects as needed
    ]);

    const handleButtonClick = (codeTypeId) => {
        const updatedCodeType = codeType.map((codeType) => (codeType.id === codeTypeId ? { ...codeType, isActive: true } : { ...codeType, isActive: false }));
        setCodeType(updatedCodeType);
    };

    // context that hold input values
    const inputValues = useSnippetEdit();

    const cssSnippet = `
    /* base style */
    .button {
        padding-inline: ${inputValues[0]}rem;
        padding-block: ${inputValues[1]}rem;
        background: ${inputValues[2]};
        box-shadow: 0rem ${inputValues[1] * 0.25}rem 0rem 0rem #513f99;
        border-radius: ${inputValues[3]}rem;
        color: #fff;
        font-size: ${inputValues[4]}rem;
        transition: all 50ms ease-in-out;
    }

    /* hover style */
    .button:hover {
        transform: translateY(${inputValues[1] * 0.25}rem);
        box-shadow: 0rem 0rem 0rem 0rem #513f99;
    }
    `;

    const htmlSnippet = `
    // tag
    <button class="button">Click</button>
    `;

    // loop through buttons
    //

    return (
        <section className={`${styles.CodeOutput} card`}>
            <ul className={styles.CodeOptions}>
                <li className={styles.LanguageOptions}>
                    {codeType.map((codeType) => (
                        <ButtonPrimary
                            key={codeType.id}
                            btnLabel={codeType.label}
                            isActive={codeType.isActive}
                            onClick={() => handleButtonClick(codeType.id)}
                        ></ButtonPrimary>
                    ))}
                </li>
                <li>
                    <ButtonPrimary btnLabel="Copy Code"></ButtonPrimary>
                </li>
            </ul>
            <div className={styles.OutputCode}>
                <CodeBlock
                    code={codeType[0].isActive ? htmlSnippet : cssSnippet}
                    language={codeType[0].isActive ? "html" : "css"}
                ></CodeBlock>
            </div>
        </section>
    );
}
