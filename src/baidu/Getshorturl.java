package baidu;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Getshorturl extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request  the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException      if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String callback = request.getParameter("callback");
		String url = request.getParameter("url");
		System.out.println(url);
		JsonObject jsonobj = new JsonObject();
		String api = "https://api.2cn.dev/" + encode(encode("https://bd.dfvips.com?q="+encode(url)));
		URL realUrl = new URL(api);
		if ("https".equalsIgnoreCase(realUrl.getProtocol())) {
			try {
				SslUtils.ignoreSsl();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		jsonobj.addProperty("success", "true");
		jsonobj.addProperty("status", 200);
		Document doc = null;
		try {
			doc = Jsoup.connect(api).ignoreContentType(true).userAgent(
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36")
					.referrer("http://bd.dfvips.com").timeout(50000).get();
			String json = doc.body().text();
			System.out.println(json);
			JsonObject jsono = new JsonParser().parse(json).getAsJsonObject();
			try {
				jsonobj.addProperty("url", jsono.get("url").getAsString());
				jsonobj.addProperty("url_orginal", url);
			} catch (Exception e) {
				// TODO: handle exception
				jsonobj.addProperty("success", "false");
				jsonobj.addProperty("status", 500);
				jsonobj.addProperty("error", "server error");
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			jsonobj.addProperty("success", "false");
			jsonobj.addProperty("status", 500);
			jsonobj.addProperty("error", e.getMessage().toString());
		}
		if (callback != null && !callback.equals("null")) {
			out.println(callback + "(" + jsonobj.toString() + ")");
		} else {
			out.println(jsonobj.toString());
		}
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request  the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException      if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public static String encode(String s) {
		try {
			s = URLEncoder.encode(s, "utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return s;
	}
}
