import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { useParams } from 'react-router';
import ReactLoading from 'react-loading';


const PdfViewer = () => {
    const [pdfString, setPdfString] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { noteId } = useParams();
    const [scale, setScale] = useState(1.0); // Add scale state with default 1.5

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url,
          ).toString();
        const fetchPdf = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/subjects/read/${noteId}`,
                    { responseType: 'blob' }
                );
                
                // Convert blob to base64
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onloadend = () => {
                    const base64String = reader.result;
                    setPdfString(base64String.substr(base64String.indexOf(',') + 1));
                    setIsLoading(false);
                };
            } catch (error) {
                console.error('Error fetching PDF:', error);
                setIsLoading(false);
            }
        };

        fetchPdf();
    }, [noteId]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4 pt-20">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <ReactLoading type="spinningBubbles" color="#F59E0B" height={50} width={50} />
                </div>
            ) : (
                <>
                    <div className="mb-4 flex items-center gap-4 sticky top-4 z-10 bg-black p-4 rounded-lg shadow-md w-full max-w-[1200px] border border-amber-700/20">
                        {/* Add zoom controls */}
                        <button
                            onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                            className="px-3 py-1 bg-gray-800 text-amber-400 rounded border border-amber-700/30 hover:bg-gray-700 transition-colors"
                        >
                            -
                        </button>
                        <button
                            onClick={() => setScale(prev => Math.min(prev + 0.2, 2.5))}
                            className="px-3 py-1 bg-gray-800 text-amber-400 rounded border border-amber-700/30 hover:bg-gray-700 transition-colors"
                        >
                            +
                        </button>
                        <div className="mx-2 text-amber-200/80">Zoom: {Math.round(scale * 100)}%</div>
                        <button
                            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                            disabled={pageNumber <= 1}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-medium rounded disabled:opacity-50 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
                        >
                            Previous
                        </button>
                        <span className="text-lg text-amber-200">
                            Page {pageNumber} of {numPages || '--'}
                        </span>
                        <button
                            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                            disabled={pageNumber >= numPages}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-medium rounded disabled:opacity-50 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
                        >
                            Next
                        </button>
                    </div>

                    <div className="shadow-lg max-w-[1200px] w-full overflow-auto bg-black p-4 rounded-lg border border-amber-700/20">
                        <Document
                            file={`data:application/pdf;base64,${pdfString}`}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div className="flex justify-center p-4">
                                    <ReactLoading type="spin" color="#F59E0B" height={30} width={30} />
                                </div>
                            }
                            error={
                                <div className="text-amber-500 p-4 text-center">
                                    Failed to load PDF. Please try again.
                                </div>
                            }
                        >
                            <Page
                                pageNumber={pageNumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="bg-white mx-auto shadow-xl"
                                scale={scale}
                                width={Math.min(window.innerWidth - 80, 1100)} // Responsive width
                            />
                        </Document>
                    </div>
                </>
            )}
        </div>
    );
};

export default PdfViewer;
