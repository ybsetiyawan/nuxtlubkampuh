PGDMP  /        
             }            db    16.3    16.3 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    74880    db    DATABASE     }   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db;
                postgres    false            �            1259    74938 
   c_material    TABLE     b  CREATE TABLE public.c_material (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_material;
       public         heap    postgres    false            �            1259    74881    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public         heap    postgres    false            �            1259    74886    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    id_customer character varying(36)
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    74894 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public         heap    postgres    false            �            1259    74901 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public         heap    postgres    false            �            1259    74906    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    74914 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public         heap    postgres    false            �            1259    74957 
   t_delivery    TABLE       CREATE TABLE public.t_delivery (
    id character varying(36) NOT NULL,
    doc_no character varying(7) NOT NULL,
    tanggal_kirim timestamp without time zone DEFAULT now(),
    id_customer character varying(50) NOT NULL,
    keterangan character varying(50),
    is_status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.t_delivery;
       public         heap    postgres    false            �            1259    74966    t_delivery_detail    TABLE     �  CREATE TABLE public.t_delivery_detail (
    id character varying(36) NOT NULL,
    id_delivery character varying(36) NOT NULL,
    id_material character varying(50) NOT NULL,
    qty integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false,
    CONSTRAINT t_delivery_detail_qty_check CHECK ((qty > 0))
);
 %   DROP TABLE public.t_delivery_detail;
       public         heap    postgres    false            �          0    74938 
   c_material 
   TABLE DATA           p   COPY public.c_material (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    221   �1       �          0    74881    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   B3       �          0    74886    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted, id_customer) FROM stdin;
    public          postgres    false    216   G4       �          0    74894 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   7       �          0    74901 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �9       �          0    74906    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   :       �          0    74914 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   >       �          0    74957 
   t_delivery 
   TABLE DATA           �   COPY public.t_delivery (id, doc_no, tanggal_kirim, id_customer, keterangan, is_status, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    222   qA       �          0    74966    t_delivery_detail 
   TABLE DATA           �   COPY public.t_delivery_detail (id, id_delivery, id_material, qty, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    223   B       \           2606    74944    c_material c_material_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.c_material
    ADD CONSTRAINT c_material_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.c_material DROP CONSTRAINT c_material_pkey;
       public            postgres    false    221            P           2606    74922    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            R           2606    74924    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            T           2606    74926    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            V           2606    74928    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            X           2606    74930    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            Z           2606    74932    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            `           2606    74973 (   t_delivery_detail t_delivery_detail_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_pkey;
       public            postgres    false    223            ^           2606    74965    t_delivery t_delivery_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.t_delivery
    ADD CONSTRAINT t_delivery_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.t_delivery DROP CONSTRAINT t_delivery_pkey;
       public            postgres    false    222            a           2606    74933    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    4688    216            b           2606    74974 4   t_delivery_detail t_delivery_detail_id_delivery_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_delivery_fkey FOREIGN KEY (id_delivery) REFERENCES public.t_delivery(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_delivery_fkey;
       public          postgres    false    223    4702    222            c           2606    74979 4   t_delivery_detail t_delivery_detail_id_material_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.t_delivery_detail
    ADD CONSTRAINT t_delivery_detail_id_material_fkey FOREIGN KEY (id_material) REFERENCES public.c_material(id);
 ^   ALTER TABLE ONLY public.t_delivery_detail DROP CONSTRAINT t_delivery_detail_id_material_fkey;
       public          postgres    false    223    221    4700            �   �  x���M��0���)|9��R�;c�Ӌ!0Y�N���r ��	Ҳ��WOo/�ŽXhT8l5��M,�Q��+ w/�yx|����y^�Ƿ�#� ʀq�<�4bT%ꚿ�	5d7w[aG�Z�@���&�1eMֹ;ZA
�8A�A�,��d�{��v��� �XHPK�í
�/�[�V7�m;񱻿��~2�_���/N�L���oƥ��@�i��<om����$'�Sw_n��9a���(����yL(�x�x/R*W���ᣆl��xhNI7:����r<[�D8���\�|_���FV*ɹ���V�˶=�V���z���r{]^������噂'�1�\��_
S���y��r�����a���B�����??�L'HgI�\x1��8 xC'�#&�׾�W�>�}�����      �   �   x���=n�0�Y>�/@��HI���!?p�-�eI�?Bm�@�����ᩭ%�Fh%7�
E+��E&������ݟ��u~8FV@
#�l�H�����*#�	eR�;�Ly!�������)�P-���!�ڶ�m�"��`+�K�b=�]����?��Ӽ�
�8Q��<�*�7$�^���e�RX�i�E+X�	X�#viu'�>�i>|�.(�#��W���-���@$�)��a�e:c�      �   �  x���Is�HF��Wp���ڋ`�m�F,�f��K��A�ï�b��#�ԡ
EJ�����E��"%�2 \F �qNbJ3��.��Wac}5]|-/hy�p�����=ߙ����PO�ױ8���a8k�o��?.�-���!��mN�I��Ye��J}%S�'�(G*!��]F�r�@��S� � ��@��W�}�t�1�AبIi�y?�5�Ci��1�=@v,�a7=ڃ]�����i�<9�v\��CS�$\�г9����~���j��˕�y<f2�`$�$8,	�.�h��Lru�d���:BC���i�ϧ��U6�ip�*��M!�/5�V���#��h�!x'$P�|-�R��_@$|$�{A$�Jm�C����f�n?�7�Ȫ��#��ð]-'l2n���Oz!�͓��%t��*��.xk�y���ylߴ�� ���u�%�?2wg��C�Jb�.�LZ��9nA8���ԗ��j�z
��A'j�i���O\�؞.w�}����ײ��Y�4��L�xi��d0׌BJ�M�S҇Ti�ܠT���I(%S.I�!�qK�1J!�gjz��V�ͮ���x����㵪�7����N���޾שJ؎�3p�|�g��ہ�>�F/�LWj��R��!zR
O	���2���NT��\���?]]`�H,_�~�Z�7|�!�      �   �  x�m��n�0���S����s�V���*���7N�@JIPHT��wL�ݵ"�h&�|�X�����M0U*�;�x��6\�6K.��3#�ۘ��Kæ%��1tcB�%8%�6��c�)|�bا����	7'���ahɜ��_�1u���cg����Ѝ->�
��H~�����>��� �X�~Z$��Xt_{��gm,�A��(f�gՅ�BQTH�Ԣ�,7����1W5�@��*m�s�#S�6��n `m*�R\�*ԪQ��R%U�e�(Y��>�%�x����즑�uq:�������!T(Uql�@C���3����dF+&��d���+��*%��G�Ke�b�[���j���� ����&q�c�4)&"!�99���i��m�ɫ���V;���8�O^�Xo�����]�N���3
�,d��2�9D��x�=j]*�<p�?$P*��oD���F��Q*��Q�7��1Q*����IT6�&����v�-�F���Xap�r��U �.�_}�a[���k_l��!��nQ�z�#*�����$���2%w���t�*d�U�!�����l��\�5��k�3��/�d��2����!�0�=YƖ��v���#�$���6e�~M��NJy�R,���{�l)5�`��b2l)�(�VB�3���fE&�      �   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      �   �  x�m�ˎ�FEל� �e�TW��;#�d� p�7��1#q@Rv����F|x�XE��oݺ�*\b�3�.t�J��Ph����r�N�������/�s)�j��2_���S���s�Y��
*�(p&x�Ђi�i@k�odhknZ�Z	���8�7շ?��AB:�6�!
�U�;�tRR��U��| �Ka�.`�zzc�wEB�e�E�*Հ�VlLD�E�"4h�vve:'�H��ud2ά��ĳ�xJ�>��)~L�)�?wZm�����?�v�&�H�
��䁐��^hGCZ	r�y�,C�yih��2�h�ϨTJ���i�y�Ng?�y<�{a���T(}�	�����B�Xs�
l�l��`����J�8� a�t6k!�"�	�H}M�%H�ĚC�F���<�������S�p�_�K~�5�
�HԜlIT.$�f61�,��@V�����R"G+|��NE��ٮ�]��ٖ�\7,�,	E�bj�k4S؟[e�h=�i�����Y��1��`��Ą�<�A�X�C(����T7�y-"�>� oQ�`�HnQ��<Ҫ.e����D�$���lX �Щ��b��h�j�a��>��cQ��Fg��b�&RM�l>��-���1N�;dd^$4k�&T_��0�ǳ��Zay�	�戲W�j'�=�D�3Zo{��uIq�KLff1S$��gI��/�`���\t}K����vP%	�Чq�6��dZ�-w�S���ɇ���Y���Q\u�,t0�CM��/뮟��Z[��_h�2�~�9>��:/Ò���$�B-���E��ta-�m�%�H��#%���@y�FnsJ�B��#��S~���괚��K'�;��Q��%�����J�R5�JJ�W�գ��pz�h��r>��4fOA3���d�΢)�T�A��!�i���u���$�؟�����H��k|f��K��,#��+.g��,�*���o�����(�!�      �   [  x���]n#K��;��h�"f�R��_����nr��H�[�%��8�똵�:����;�b�c��G�5k�k� �K~M\�x���adB(��vq\�'2���������/
�iČ n*,Ć[�<�[��(Q�i�|!�CP�݅� KW��N<�������bV���2���*z�:�X�ˊ��)�+O	]��]��]��WٹQS�j}2��h�4�W�����"4ئY�o�6jTr�4G����ʎ��S�~s�j�s��>A044��Z5�m��Fq���dt����*}�L�+�Qv��&YL&�h����sߖx���#���^ڢǴ��L)�w�K#���F�����*~��0�Q�����8��bs�m��a� ����1��j%���g%\W[�:磧������t�m��U�cO���.����^�i�J���ԙ����q,�."Cv�=��ݨ��Y�hM&5�l��I���g��B�տ����.��@v֋�2��3������#Y��2A?�����<,�s��z��`��ʝ܋Il�I6ɦsfYq�v��D�\�jo^v?��T����,[��N����Uj���'��S��^j')U��β�yUi+�����c5�1ߙ���o�v*��-�PN����f@:�A�hݛɒ���P�i�n�[�Y"�m��
���:93���h}�j9�����Rp����w�����D�w��B�E`?i�V�(+�KmZ�����Q��1Y{nY�u�G�Ht:����T�\k~�ܞ�z��]d'c�#�_�㫙�%�&��r��<+:P[	��Ȅ:��wd���h��zw�V��ל��%�?�gէ��������<Cq      �   �   x�M�9�0 k���F��N�H��@VH@��H�4�t��
V�ށ�ɀ�� d���J)� z�-�!@"�8����P��`L&�KN�a�|��^�֖��%����M�E=�����$��N��Hw�Ak'��e؟e�kb<��r줔��/�      �   �   x�����D1C��W�0�@�"��� 	����j��响�)n��\x�Dc)
QZ�ծ�X�s k��*�(R�J��W��
���1��A���6�\�հu@?4��o◢1����W��,k�>Ht�!�Z_�|Z�3������ �:��B+�ʠ^q���k�gu0&�R��6�=�O�%���Nh'�*c����.z��}���-Hm�     