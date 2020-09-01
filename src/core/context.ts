export type RequestTimestamp = {
  /*
   * Request begin.
   */
  requestStart: Date;
  /**
   * request.on("socket")
   */
  onSocket: Date;
  /**
   * Exact time that dns look up done.
   */
  onLookUp: Date;
  /**
   * Exact time that client finished sending HTTP request to the server.
   */
  requestFinish: Date;
  /**
   * socket.on("connect")
   */
  socketConnect: Date;
  /**
   * request.on("response")
   */
  onResponse: Date;
  /**
   * response.on("close")
   */
  responseClose: Date;
  /**
   * milliseconds Fiddler spent in DNS looking up the server's IP address.
   */
  dnsTime: number;
};

export interface RequestLog {
  SN: number;

  protocol: "HTTPS" | "HTTP";
  host: string;
  path: string;
  process: string;

  clientIp: string;
  clientPort: number;
  serverIp: string;
  serverPort: number;

  requestHeader: string;
  requestBody: string;

  responseHeader: string;
  responseBody: string;
  responseLength: number;
  responseType: string;
  statusCode: number;

  timestamps: RequestTimestamp;
}

export class Context {
  /**
   * Needed report
   */
  isReport: boolean;
  /**
   * context id
   */
  cid: symbol;

  captureSN: number;
  /**
   * Line by line logs for current request/response.
   */
  logs: Array<string>;
  /**
   * Raw data of current request/response.
   */
  timestamp: number;
  /**
   * All ajax raw data.
   */
  captureRequests: RequestLog[];

  constructor() {
    this.logs = [];
    this.timestamp = Date.now();
    this.captureRequests = [];
    this.captureSN = 0;
    this.isReport = false;
  }
}
